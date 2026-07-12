import { IEvent, IEventCalendarOptions, ICalendarState } from "./types";

declare const moment: any;
declare const $: any;

/**
 * Core Class representing an isolated Event Calendar instance.
 * It handles DOM manipulation, event rendering, state management,
 * and synchronous localization configuration using in-memory bundles.
 */
export class EventCalendarInstance {
  private $wrap: any;
  private options: IEventCalendarOptions;
  private state: ICalendarState;
  private cachedEvents: IEvent[] | null = null;
  private directionLeftMove: number = 300;

  /**
   * Initializes a new Event Calendar instance.
   * 
   * @param element The physical DOM element to attach the calendar to.
   * @param options The configuration options provided by the user.
   */
  constructor(element: HTMLElement, options: IEventCalendarOptions) {
    this.$wrap = $(element);
    this.options = this.mergeOptions(options);
    this.state = { year: 0, month: -1, day: 0, direction: "" };
    this.init();
  }

  /**
   * Public API method to change the language on the fly without reloading events from the server.
   * Translations must already be bundled and available in window.eventCalendar_i18n.
   * 
   * @param newLocale The new locale string (e.g., 'es-ES' or 'it').
   */
  public changeLocale(newLocale: string): void {
    this.applyLocaleAndRender(newLocale, true);
  }

  /**
   * Merges user-provided options with the plugin's default options.
   * 
   * @param options User-provided options.
   * @returns A deeply merged options object.
   */
  private mergeOptions(options: IEventCalendarOptions): IEventCalendarOptions {
    const defaults = $.fn.eventCalendar.options;
    return $.extend(true, {}, defaults, options);
  }

  /**
   * Bootstraps the application by rendering the initial DOM structure,
   * attaching event listeners, determining the correct locale, and initializing the UI.
   */
  private init(): void {
    this.buildDOMStructure();
    this.attachEventListeners();

    this.directionLeftMove = this.$wrap.width() || 300;
    $(window).on("resize", () => {
      this.directionLeftMove = this.$wrap.width() || 300;
    });

    // 1. Determine the initial locale: User provided -> Browser default -> Fallback to en-US
    const initialLocale = this.options.locale || navigator.language || (navigator as any).userLanguage || "en-US";

    this.applyLocaleAndRender(initialLocale, false);
  }

  /**
   * Tries to resolve a given locale string against loaded dictionaries.
   * Performs an exact match first, then falls back to base language match (e.g., 'it' -> 'it-IT').
   * 
   * @param locale Requested locale.
   * @returns The resolved exact key in the dictionary, or null if unsupported.
   */
  private resolveLocale(locale: string): string | null {
    const globalI18n = (window as any).eventCalendar_i18n || {};
    
    // 1. Exact match
    if (globalI18n[locale]) {
        return locale;
    }

    // 2. Base language match (e.g., 'it' -> 'it-IT' or 'en' -> 'en-US')
    const baseLang = locale.split('-')[0].toLowerCase();
    for (const key in globalI18n) {
        if (key.toLowerCase().startsWith(baseLang)) {
            return key;
        }
    }

    return null;
  }

  /**
   * Processes the requested locale and updates the calendar state.
   * 
   * @param requestedLocale The target locale string.
   * @param isRuntimeChange True if triggered manually after init; false if during initialization.
   */
  private applyLocaleAndRender(requestedLocale: string, isRuntimeChange: boolean): void {
    const globalI18n = (window as any).eventCalendar_i18n || {};
    const resolvedLocale = this.resolveLocale(requestedLocale);

    if (!resolvedLocale) {
        console.warn(`[EventCalendar] Locale '${requestedLocale}' not found.`);
        
        // Show temporary UI error
        const $loading = this.$wrap.find(".eventCalendar-loading");
        $loading.text("Language not found").addClass("error").show();
        setTimeout(() => {
            $loading.fadeOut().removeClass("error");
        }, 3000);

        if (!isRuntimeChange) {
            // Initial load failed -> Ultimate fallback (en-US or first available)
            const fallback = globalI18n["en-US"] ? "en-US" : Object.keys(globalI18n)[0];
            if (fallback) {
                 this.applyActualLocale(fallback, globalI18n[fallback]);
            }
        }
        
        // If it's a runtime change, we do NOTHING. We keep the current valid locale.
        return;
    }

    // Apply the successfully resolved locale
    this.applyActualLocale(resolvedLocale, globalI18n[resolvedLocale]);
  }

  /**
   * Physically applies the translation data, configures Moment.js, and redraws the UI.
   * 
   * @param localeKey Exact key in the dictionary (e.g. 'it-IT').
   * @param i18nData Translation data object.
   */
  private applyActualLocale(localeKey: string, i18nData: any): void {
    this.options.locale = localeKey;
    this.options.i18n = i18nData;

    // Use the specific Moment.js locale code defined inside the i18n object (e.g., 'it', 'en-us')
    const momentLocaleCode = (i18nData.locale || localeKey).toLowerCase();

    // Configure Moment.js
    if (i18nData.moment) {
      const loadedLocales = typeof moment.locales === "function" ? moment.locales() : [];
      if (loadedLocales.indexOf(momentLocaleCode) >= 0 && typeof moment.updateLocale === "function") {
        moment.updateLocale(momentLocaleCode, i18nData.moment);
      } else {
        moment.defineLocale(momentLocaleCode, i18nData.moment);
      }
    } else {
      moment.locale(momentLocaleCode);
    }

    // Dynamically adjust the start of the week based on the locale's Moment.js settings.
    // If the 'dow' (Day of Week) is 1, the week starts on Monday.
    if (i18nData.moment && i18nData.moment.week && i18nData.moment.week.dow === 1) {
        this.options.startWeekOnMonday = true;
    } else {
        this.options.startWeekOnMonday = false;
    }

    // CRITICAL FIX: Clear the existing calendar grid from the DOM to avoid overlapping old languages
    this.$wrap.find('.eventCalendar-slider').empty();

    // Redraw Grid
    this.renderMonth("current");

    // Redraw Events without hitting the server
    if (this.cachedEvents) {
      this.renderEventsList(this.cachedEvents);
      this.updateSubtitle();
    } else {
      this.fetchAndRenderEvents();
    }
  }

  /**
   * Constructs the main HTML skeleton inside the wrapper element.
   */
  private buildDOMStructure(): void {
    const loadingTxt = this.options.i18n?.txt_loading || "loading...";
    this.$wrap.addClass("eventCalendar-wrap").html(`
            <div class='eventCalendar-slider'></div>
            <div class='eventCalendar-list-wrap' aria-live="polite">
                <p class='eventCalendar-subtitle'></p>
                <span class='eventCalendar-loading'>${loadingTxt}</span>
                <div class='eventCalendar-list-content ${this.options.eventsScrollable ? "scrollable" : ""}'>
                    <ul class='eventCalendar-list'></ul>
                </div>
            </div>
        `);
  }

  /**
   * Binds click and keyboard events to the dynamically generated DOM elements.
   */
  private attachEventListeners(): void {
    this.$wrap.on("click", '[name="arrow"]', (e: any) => {
      e.preventDefault();
      const direction = $(e.currentTarget).attr("data-dir") as "next" | "prev";
      this.changeMonth(direction);
    });

    this.$wrap.on("click", 'li[id^="dayList_"] a', (e: any) => {
      e.preventDefault();
      const day = parseInt($(e.currentTarget).parent().attr("rel") || "0", 10);
      this.state = { ...this.state, day, direction: "day" };
      this.fetchAndRenderEvents();

      if (this.options.callbacks?.changeDay) {
        this.options.callbacks.changeDay(
          new Date(this.state.year, this.state.month, day),
        );
      }
    });

    this.$wrap.on("click", ".eventCalendar-eventTitle", (e: any) => {
      if (!this.options.showDescription) {
        e.preventDefault();
        const $desc = $(e.currentTarget).siblings(".eventCalendar-eventDesc");

        if (!$desc.find("a.bt").length) {
          const url = $(e.currentTarget).attr("href");
          const target = $(e.currentTarget).attr("target") || "_self";
          const gotoTxt = this.options.i18n?.txt_GoToEventUrl || "Go to event";
          $desc.append(
            `<a href="${url}" target="${target}" class="bt">${gotoTxt}</a>`,
          );
        }

        if ($desc.is(":visible")) {
          $desc.slideUp();
        } else {
          if (this.options.onlyOneDescription) {
            this.$wrap.find(".eventCalendar-eventDesc").slideUp();
          }
          $desc.slideDown();
        }
      }
    });

    this.$wrap.on(
      "keydown",
      '[name="arrow"], li[id^="dayList_"] a, .eventCalendar-eventTitle',
      (e: any) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          $(e.currentTarget).trigger("click");
        }
      },
    );
  }

  /**
   * Animates the transition between months.
   * @param direction Target direction to slide the calendar.
   */
  private changeMonth(direction: "next" | "prev"): void {
    this.renderMonth(direction);
    const moveOperator = direction === "next" ? "-=" : "+=";
    const moveOpacity = this.options.moveOpacity ?? 0.15;
    const moveSpeed = this.options.moveSpeed ?? 500;

    this.$wrap.find(".eventCalendar-monthWrap.eventCalendar-oldMonth").animate(
      {
        opacity: moveOpacity,
        left: `${moveOperator}${this.directionLeftMove}`,
      },
      moveSpeed,
      function (this: any) {
        $(this).remove();
      },
    );
  }

  /**
   * Builds and renders the grid for the requested month.
   * @param monthOrDirection Direction to render relative to the current state.
   */
  private renderMonth(monthOrDirection: "current" | "next" | "prev"): void {
    const $slider = this.$wrap.find(".eventCalendar-slider");
    const date = new Date();

    this.$wrap
      .find(".eventCalendar-monthWrap.eventCalendar-currentMonth")
      .removeClass("eventCalendar-currentMonth")
      .addClass("eventCalendar-oldMonth");

    if (monthOrDirection !== "current") {
      date.setFullYear(this.state.year, this.state.month, 1);
      date.setMonth(date.getMonth() + (monthOrDirection === "prev" ? -1 : 1));
    }

    this.state.year = date.getFullYear();
    this.state.month = date.getMonth();

    const monthTitle = moment(
      new Date(this.state.year, this.state.month, 1),
    ).format("MMMM YYYY");

    const $newMonthWrap = $(`
            <div class='eventCalendar-monthWrap eventCalendar-currentMonth'>
                <div class='eventCalendar-currentTitle'>
                    <a href='#' class='eventCalendar-monthTitle'>${monthTitle}</a>
                </div>
                <ul class='eventCalendar-daysList ${this.options.showDayAsWeeks ? "eventCalendar-showAsWeek" : ""}'></ul>
            </div>
        `);

    if (monthOrDirection === "current") {
      const txtPrev = this.options.i18n?.txt_prev || "prev";
      const txtNext = this.options.i18n?.txt_next || "next";
      $slider.append(`
                <a name='arrow' data-dir='prev' href='#' class='eventCalendar-arrow eventCalendar-prev' role="button" tabindex="0" aria-label="${txtPrev}"><span>${txtPrev}</span></a>
                <a name='arrow' data-dir='next' href='#' class='eventCalendar-arrow eventCalendar-next' role="button" tabindex="0" aria-label="${txtNext}"><span>${txtNext}</span></a>
            `);
    }

    const $daysList = $newMonthWrap.find(".eventCalendar-daysList");

    if (this.options.showDayAsWeeks) {
      $daysList.addClass("showDayNames");
      let dayNames = this.options.i18n?.dayNamesShort || [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ];

      if (this.options.startWeekOnMonday) {
        dayNames = [...dayNames.slice(1), dayNames[0]];
      }

      let dayHeadersHtml = "";
      dayNames.forEach((name: string) => {
        dayHeadersHtml += `<li class='eventCalendar-day-header'>${name}</li>`;
      });
      $daysList.append(dayHeadersHtml);
    }

    let firstDayOfMonth = new Date(
      this.state.year,
      this.state.month,
      1,
    ).getDay();
    if (this.options.startWeekOnMonday) {
      firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    }

    if (this.options.showDayAsWeeks) {
      const prevMonthDays = new Date(
        this.state.year,
        this.state.month,
        0,
      ).getDate();
      for (let i = 0; i < firstDayOfMonth; i++) {
        const dayNum = prevMonthDays - firstDayOfMonth + 1 + i;
        $daysList.append(
          `<li class='eventCalendar-day eventCalendar-empty'><span class='eventCalendar-empty-date'>${dayNum}</span></li>`,
        );
      }
    }

    const daysInMonth = new Date(
      this.state.year,
      this.state.month + 1,
      0,
    ).getDate();
    const currentDay = new Date().getDate();
    const isCurrentMonth =
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear();

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === currentDay ? "today" : "";
      $daysList.append(
        `<li id='dayList_${day}' rel='${day}' class='eventCalendar-day ${isToday}'><a href='#' tabindex="0" aria-label="${day} ${monthTitle}">${day}</a></li>`,
      );
    }

    if (this.options.showDayAsWeeks) {
      const totalCells = firstDayOfMonth + daysInMonth;
      const tailDays = (7 - (totalCells % 7)) % 7;
      for (let i = 1; i <= tailDays; i++) {
        $daysList.append(
          `<li class='eventCalendar-day eventCalendar-empty'><span class='eventCalendar-empty-date'>${i}</span></li>`,
        );
      }
    }

    $slider.append($newMonthWrap);
    $slider.css("height", $newMonthWrap.height() + "px");

    if (monthOrDirection !== "current") {
      this.state.direction = monthOrDirection;
      this.fetchAndRenderEvents();
    }
  }

  /**
   * Updates the subtitle text based on the current view state.
   */
  private updateSubtitle(): void {
    const $subtitle = this.$wrap.find(".eventCalendar-subtitle");

    if (this.state.direction === "day") {
      const dateObj = new Date(
        this.state.year,
        this.state.month,
        this.state.day,
      );
      const dateStr = moment(dateObj).format("LL");
      const prevTxt = this.options.i18n?.txt_SpecificEvents_prev || "";
      const afterTxt = this.options.i18n?.txt_SpecificEvents_after || "events:";
      $subtitle.text(`${prevTxt} ${dateStr} ${afterTxt}`);
    } else {
      const nextTxt = this.options.i18n?.txt_NextEvents || "Next events:";
      $subtitle.text(nextTxt);
    }
  }

  /**
   * Fetches events via AJAX or reads from the local array.
   */
  private fetchAndRenderEvents(): void {
    this.$wrap.find(".eventCalendar-loading").fadeIn();
    this.updateSubtitle();

    if (typeof this.options.jsonData === "string") {
      if (!this.options.cacheJson || !this.cachedEvents) {
        $.getJSON(
          `${this.options.jsonData}?limit=${this.options.eventsLimit}&year=${this.state.year}&month=${this.state.month}&day=${this.state.day}`,
        )
          .done((data: IEvent[]) => {
            this.cachedEvents = data;
            this.renderEventsList(data);
          })
          .fail(() => {
            const errorTxt =
              this.options.i18n?.txt_errorLoading || "Error loading events";
            this.$wrap
              .find(".eventCalendar-loading")
              .text(errorTxt)
              .addClass("error");
          });
      } else {
        this.renderEventsList(this.cachedEvents);
      }
    } else {
      this.cachedEvents = this.options.jsonData;
      this.renderEventsList(this.cachedEvents);
    }
  }

  /**
   * Generates and appends the HTML list of events.
   * @param data Array of events to be displayed.
   */
  private renderEventsList(data: IEvent[]): void {
    const $list = this.$wrap.find(".eventCalendar-list");
    let htmlEvents: string[] = [];

    data.forEach((event, index) => {
      const eventLinkTarget = this.options.openEventInNewWindow
        ? "_blank"
        : "_self";
      const eventTitle = event.url
        ? `<a href="${event.url}" target="${eventLinkTarget}" class="eventCalendar-eventTitle clearfix">${event.title}</a>`
        : `<span class="eventCalendar-eventTitle clearfix">${event.title}</span>`;

      const eventDescClass = !this.options.showDescription
        ? "eventCalendar-hidden"
        : "";

      htmlEvents.push(`
                <li id="event_${index}" class="clearfix">
                    ${eventTitle}
                    <div class="eventCalendar-eventDesc ${eventDescClass}">${event.description}</div>
                </li>
            `);
    });

    if (htmlEvents.length === 0) {
      const noEventsTxt = this.options.i18n?.txt_noEvents || "No events";
      htmlEvents.push(
        `<li class="eventCalendar-noEvents clearfix"><p>${noEventsTxt}</p></li>`,
      );
    }

    this.$wrap.find(".eventCalendar-loading").hide();
    const moveSpeed = this.options.moveSpeed ?? 500;
    $list.html(htmlEvents.join("")).hide().fadeIn(moveSpeed);
  }
}