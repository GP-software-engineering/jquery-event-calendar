"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // src/EventCalendarInstance.ts
  var GpsEventCalendar;
  var init_EventCalendarInstance = __esm({
    "src/EventCalendarInstance.ts"() {
      "use strict";
      ((GpsEventCalendar2) => {
        class EventCalendarInstance {
          /**
           * Initializes a new instance of the EventCalendar plugin.
           * @param element The target DOM element where the calendar will be rendered.
           * @param options Configuration options for the calendar instance.
           */
          constructor(element, options) {
            this.cachedEvents = null;
            this.directionLeftMove = 300;
            this.instanceId = Math.random().toString(36).substr(2, 9);
            this.eventNamespace = `.gpsEventCalendar_${this.instanceId}`;
            this.$wrap = $(element);
            this.options = this.mergeOptions(options);
            this.state = { year: 0, month: -1, day: 0, direction: "" };
            this.init();
          }
          /**
           * Dynamically updates the dataset of the calendar without destroying the DOM structure.
           * Optionally calculates and navigates directly to the first month containing events.
           * @param newEvents The new array of events to render.
           * @param jumpToFirstMonth If true, automatically navigates the calendar view to the first available event month.
           */
          setEvents(newEvents, jumpToFirstMonth = true) {
            this.options.jsonData = newEvents;
            this.cachedEvents = newEvents;
            if (jumpToFirstMonth && newEvents && newEvents.length > 0) {
              this.applyFirstMonthWithEvents(newEvents);
            }
            this.$wrap.find(".eventCalendar-slider").empty();
            this.renderMonth("current");
            this.renderEventsList(newEvents);
            this.updateSubtitle();
          }
          /**
           * Changes the active localization language at runtime and refreshes the calendar view.
           * @param newLocale The new locale string (e.g., 'it-IT' or 'en-US').
           */
          changeLocale(newLocale) {
            this.applyLocaleAndRender(newLocale, true);
          }
          /**
           * Destroys the calendar instance, removes DOM structures, and unbinds all namespaced events.
           */
          destroy() {
            $(window).off(this.eventNamespace);
            this.$wrap.off(this.eventNamespace);
            this.$wrap.empty().removeClass("eventCalendar-wrap");
            this.cachedEvents = null;
            $.removeData(this.$wrap[0], "plugin_eventCalendar");
          }
          // ============================================================================
          // PRIVATE AND PROTECTED METHODS
          // ============================================================================
          /**
           * Simple method to sanitizes user-provided or external string inputs by (when user not use templates)
           */
          escapeHtml(unsafe) {
            if (!unsafe) return "";
            return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
          }
          /**
           * Extracts and parses the event date based on the plugin configuration.
           * Restored dateTimeOffset logic from the legacy plugin.
           */
          extractEventDate(event) {
            if (!event.date) return null;
            if (this.options.jsonDateFormat === "human") {
              const eventDateTime = event.date.split(" ");
              const splittedDate = eventDateTime[0].split("-");
              const splittedTime = eventDateTime[1] ? eventDateTime[1].split(":") : ["0", "0", "0"];
              return moment(new Date(
                parseInt(splittedDate[0], 10),
                parseInt(splittedDate[1], 10) - 1,
                parseInt(splittedDate[2], 10),
                parseInt(splittedTime[0], 10),
                parseInt(splittedTime[1], 10),
                parseInt(splittedTime[2], 10)
              ));
            } else {
              const ts = Number(event.date);
              if (event.offset != null) {
                return moment.utc(ts).utcOffset(event.offset);
              } else if (this.options.dateTimeOffset != null) {
                return moment.utc(ts).utcOffset(this.options.dateTimeOffset);
              }
              return moment(ts);
            }
          }
          /**
           * Performs a deep merge of custom initialization options over the global plugin defaults.
           * 
           * @param options User-provided configuration overrides.
           * @returns The fully merged configuration object.
           */
          mergeOptions(options) {
            const defaults = $.fn.eventCalendar.options;
            return $.extend(true, {}, defaults, options);
          }
          /**
           * Initializes the core DOM scaffolding, binds event listeners, sets up responsive window
           * tracking, and triggers the initial render based on the provided or default starting date.
           */
          init() {
            this.buildDOMStructure();
            this.attachEventListeners();
            this.directionLeftMove = this.$wrap.width() || 300;
            $(window).on(`resize${this.eventNamespace}`, () => {
              this.directionLeftMove = this.$wrap.width() || 300;
            });
            if (this.options.startDate) {
              const parsedStart = this.extractEventDate({ date: this.options.startDate });
              if (parsedStart && parsedStart.isValid()) {
                this.state.year = parsedStart.year();
                this.state.month = parsedStart.month();
                this.state.day = parsedStart.date();
              }
            }
            const initialLocale = this.options.locale || navigator.language || navigator.userLanguage || "en-US";
            this.applyLocaleAndRender(initialLocale, false);
          }
          /**
           * Scans the provided events array to find the earliest future date containing an event.
           * If found, updates the internal state (year, month) so the calendar immediately opens
           * on a month with relevant data instead of an empty current month.
           * 
           * @param events The array of available events to scan.
           */
          applyFirstMonthWithEvents(events) {
            if (!this.options.showFirstMonthWithEvents || !events || events.length === 0) return;
            const eventsWithDate = events.filter((e) => e.date != null);
            if (eventsWithDate.length === 0) return;
            let earliestDate = this.extractEventDate(eventsWithDate[0]);
            for (let i = 1; i < eventsWithDate.length; i++) {
              const tempDate = this.extractEventDate(eventsWithDate[i]);
              if (tempDate && earliestDate && tempDate.valueOf() < earliestDate.valueOf()) {
                earliestDate = tempDate;
              }
            }
            if (!earliestDate || !earliestDate.isValid()) return;
            const now = moment();
            if (earliestDate.year() > now.year() || earliestDate.year() === now.year() && earliestDate.month() > now.month()) {
              this.state.year = earliestDate.year();
              this.state.month = earliestDate.month();
              this.state.day = 0;
            }
          }
          /**
           * Resolves the closest matching locale string against the globally available i18n dictionaries.
           * Falls back from specific locales (e.g., 'it-IT') to general language codes (e.g., 'it').
           */
          resolveLocale(locale) {
            const globalI18n = window.GpsEventCalendar?.i18n || {};
            if (globalI18n[locale]) return locale;
            const baseLang = locale.split("-")[0].toLowerCase();
            for (const key in globalI18n) {
              if (key.toLowerCase().startsWith(baseLang)) return key;
            }
            return null;
          }
          /**
           * Resolves locale dependencies and orchestrates either an initial setup or a runtime language switch.
           * Handles error feedback if a requested localization dictionary is missing.
           * 
           * @param requestedLocale The target locale string to apply.
           * @param isRuntimeChange Indicates whether this is invoked dynamically after initialization.
           */
          applyLocaleAndRender(requestedLocale, isRuntimeChange) {
            const globalI18n = window.GpsEventCalendar?.i18n || {};
            const resolvedLocale = this.resolveLocale(requestedLocale);
            if (!resolvedLocale) {
              console.warn(`[EventCalendar] Locale '${requestedLocale}' not found.`);
              const $loading = this.$wrap.find(".eventCalendar-loading");
              $loading.text("Language not found").addClass("error").show();
              setTimeout(() => {
                $loading.fadeOut().removeClass("error");
              }, 3e3);
              if (!isRuntimeChange) {
                const fallback = globalI18n["en-US"] ? "en-US" : Object.keys(globalI18n)[0];
                if (fallback) this.applyActualLocale(fallback, globalI18n[fallback]);
              }
              return;
            }
            this.applyActualLocale(resolvedLocale, globalI18n[resolvedLocale]);
          }
          /**
           * Configures Moment.js with the selected locale, determines first-day-of-week rules,
           * triggers initial month rendering, and either displays cached data or initiates a network fetch.
           * 
           * @param localeKey The verified locale identifier.
           * @param i18nData The localized strings and formatting rules dictionary.
           */
          applyActualLocale(localeKey, i18nData) {
            this.options.locale = localeKey;
            this.options.i18n = i18nData;
            const momentLocaleCode = (i18nData.locale || localeKey).toLowerCase();
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
            this.options.startWeekOnMonday = !!(i18nData.moment && i18nData.moment.week && i18nData.moment.week.dow === 1);
            if (Array.isArray(this.options.jsonData) && !this.options.startDate) {
              this.cachedEvents = this.options.jsonData;
              this.applyFirstMonthWithEvents(this.cachedEvents);
            }
            this.$wrap.find(".eventCalendar-slider").empty();
            const initialRenderMode = this.state.day > 0 ? "current" : "current";
            this.renderMonth(initialRenderMode);
            if (this.cachedEvents) {
              this.renderEventsList(this.cachedEvents);
              this.updateSubtitle();
            } else {
              this.fetchAndRenderEvents();
            }
          }
          /**
           * Constructs the foundational HTML layout inside the root `$wrap` container,
           * defining accessibility attributes (`aria-live`), the slider viewport, and the event list wrapper.
           */
          buildDOMStructure() {
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
           * Binds all interactive DOM handlers using namespaced events to prevent leaking.
           * Includes support for mouse clicks, keyboard navigation (WCAG accessibility), and touch swipes.
           */
          attachEventListeners() {
            this.$wrap.on(`click${this.eventNamespace}`, '[name="arrow"]', (e) => {
              e.preventDefault();
              const direction = $(e.currentTarget).attr("data-dir");
              this.changeMonth(direction);
            });
            this.$wrap.on(`click${this.eventNamespace}`, ".eventCalendar-monthTitle", (e) => {
              e.preventDefault();
              this.state.day = 0;
              this.state.direction = "month";
              this.$wrap.find(".eventCalendar-day a").attr("aria-selected", "false");
              this.fetchAndRenderEvents();
            });
            this.$wrap.on(`click${this.eventNamespace}`, ".eventCalendar-day a", (e) => {
              e.preventDefault();
              const dayAttr = $(e.currentTarget).parent().attr("rel");
              if (!dayAttr) return;
              const day = parseInt(dayAttr, 10);
              this.state = { ...this.state, day, direction: "day" };
              this.$wrap.find(".eventCalendar-day a").attr("aria-selected", "false");
              $(e.currentTarget).attr("aria-selected", "true");
              this.fetchAndRenderEvents();
              if (this.options.callbacks?.changeDay) {
                this.options.callbacks.changeDay(new Date(this.state.year, this.state.month, day));
              }
            });
            this.$wrap.on(`click${this.eventNamespace}`, ".eventCalendar-eventTitle", (e) => {
              if (!this.options.showDescription) {
                e.preventDefault();
                const $desc = $(e.currentTarget).siblings(".eventCalendar-eventDesc");
                if (!$desc.find("a.bt").length) {
                  const url = $(e.currentTarget).attr("href");
                  const target = $(e.currentTarget).attr("target") || "_self";
                  if (url && url !== "#") {
                    const gotoTxt = this.options.i18n?.txt_GoToEventUrl || "Go to event";
                    $desc.append($("<a>").attr({ href: url, target, class: "bt" }).text(gotoTxt));
                  }
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
            this.$wrap.on(`keydown${this.eventNamespace}`, '[name="arrow"], .eventCalendar-day a, .eventCalendar-eventTitle', (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                $(e.currentTarget).trigger("click");
              }
            });
            let touchStartX = 0;
            let touchEndX = 0;
            this.$wrap.on(`touchstart${this.eventNamespace}`, ".eventCalendar-slider", (e) => {
              touchStartX = e.changedTouches[0].screenX;
            });
            this.$wrap.on(`touchend${this.eventNamespace}`, ".eventCalendar-slider", (e) => {
              touchEndX = e.changedTouches[0].screenX;
              if (touchEndX < touchStartX - 50) this.changeMonth("next");
              if (touchEndX > touchStartX + 50) this.changeMonth("prev");
            });
          }
          /**
           * Orchestrates the horizontal sliding animation when navigating between months.
           * Animates the opacity and left position of the old month container before removing it from the DOM.
           * 
           * @param direction The navigation direction ('next' or 'prev').
           */
          changeMonth(direction) {
            this.renderMonth(direction);
            const moveOperator = direction === "next" ? "-=" : "+=";
            const moveOpacity = this.options.moveOpacity ?? 0.15;
            const moveSpeed = this.options.moveSpeed ?? 500;
            this.$wrap.find(".eventCalendar-monthWrap.eventCalendar-oldMonth").animate(
              {
                opacity: moveOpacity,
                left: `${moveOperator}${this.directionLeftMove}`
              },
              moveSpeed,
              function() {
                $(this).remove();
              }
            );
          }
          /**
           * Complex DOM generation method: calculates and renders the visual calendar grid for a specific month.
           * 1. Updates internal target dates and handles year/month boundary rollovers.
           * 2. Appends navigation arrows if rendering the initial view.
           * 3. Calculates grid alignment based on `startWeekOnMonday`, inserting leading empty cells for offset.
           * 4. Renders actual days with appropriate accessibility tags (`aria-label`, `aria-selected`).
           * 5. Fills trailing empty cells to maintain a uniform grid structure.
           * 
           * @param monthOrDirection The rendering context ('current', 'next', or 'prev').
           */
          renderMonth(monthOrDirection) {
            const $slider = this.$wrap.find(".eventCalendar-slider");
            let targetYear = this.state.year > 0 ? this.state.year : (/* @__PURE__ */ new Date()).getFullYear();
            let targetMonth = this.state.month >= 0 ? this.state.month : (/* @__PURE__ */ new Date()).getMonth();
            if (monthOrDirection === "current") {
              $slider.empty();
            } else {
              this.$wrap.find(".eventCalendar-monthWrap.eventCalendar-currentMonth").removeClass("eventCalendar-currentMonth").addClass("eventCalendar-oldMonth");
            }
            if (monthOrDirection === "next") {
              targetMonth++;
              if (targetMonth > 11) {
                targetMonth = 0;
                targetYear++;
              }
            } else if (monthOrDirection === "prev") {
              targetMonth--;
              if (targetMonth < 0) {
                targetMonth = 11;
                targetYear--;
              }
            }
            this.state.year = targetYear;
            this.state.month = targetMonth;
            const monthTitle = moment(new Date(this.state.year, this.state.month, 1)).format("MMMM YYYY");
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
              let dayNames = this.options.i18n?.dayNamesShort || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              if (this.options.startWeekOnMonday) dayNames = [...dayNames.slice(1), dayNames[0]];
              let dayHeadersHtml = "";
              dayNames.forEach((name) => {
                dayHeadersHtml += `<li class='eventCalendar-day-header'>${name}</li>`;
              });
              $daysList.append(dayHeadersHtml);
            }
            let firstDayOfMonth = new Date(this.state.year, this.state.month, 1).getDay();
            if (this.options.startWeekOnMonday) {
              firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
            }
            if (this.options.showDayAsWeeks) {
              const prevMonthDays = new Date(this.state.year, this.state.month, 0).getDate();
              for (let i = 0; i < firstDayOfMonth; i++) {
                const dayNum = prevMonthDays - firstDayOfMonth + 1 + i;
                $daysList.append(`<li class='eventCalendar-day eventCalendar-empty'><span class='eventCalendar-empty-date'>${dayNum}</span></li>`);
              }
            }
            const daysInMonth = new Date(this.state.year, this.state.month + 1, 0).getDate();
            const dateObj = /* @__PURE__ */ new Date();
            const currentDay = dateObj.getDate();
            const isCurrentMonth = this.state.month === dateObj.getMonth() && this.state.year === dateObj.getFullYear();
            for (let day = 1; day <= daysInMonth; day++) {
              const isToday = isCurrentMonth && day === currentDay;
              const todayClass = isToday ? "today" : "";
              const ariaCurrent = isToday ? 'aria-current="date"' : "";
              const ariaSelected = this.state.day === day ? 'aria-selected="true"' : 'aria-selected="false"';
              $daysList.append(
                `<li rel='${day}' class='eventCalendar-day ${todayClass}'>
                        <a href='#' tabindex="0" aria-label="${day} ${monthTitle}" ${ariaCurrent} ${ariaSelected}>${day}</a>
                     </li>`
              );
            }
            if (this.options.showDayAsWeeks) {
              const totalCells = firstDayOfMonth + daysInMonth;
              const tailDays = (7 - totalCells % 7) % 7;
              for (let i = 1; i <= tailDays; i++) {
                $daysList.append(`<li class='eventCalendar-day eventCalendar-empty'><span class='eventCalendar-empty-date'>${i}</span></li>`);
              }
            }
            $slider.append($newMonthWrap);
            $slider.css("height", $newMonthWrap.height() + "px");
            if (monthOrDirection !== "current") {
              this.state.direction = monthOrDirection;
              this.state.day = 0;
              this.fetchAndRenderEvents();
            }
          }
          /**
           * Updates the text of the subtitle above the event list to reflect whether the user
           * is viewing events for a specifically selected day or viewing general upcoming events.
           */
          updateSubtitle() {
            const $subtitle = this.$wrap.find(".eventCalendar-subtitle");
            if (this.state.direction === "day" && this.state.day > 0) {
              const dateObj = new Date(this.state.year, this.state.month, this.state.day);
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
           * Fetches event data from a remote JSON URL (if configured as a string) or retrieves
           * items directly from the in-memory array, caching results when appropriate.
           */
          fetchAndRenderEvents() {
            this.$wrap.find(".eventCalendar-loading").fadeIn();
            this.updateSubtitle();
            if (typeof this.options.jsonData === "string") {
              if (!this.options.cacheJson || !this.cachedEvents) {
                $.getJSON(`${this.options.jsonData}?limit=${this.options.eventsLimit}&year=${this.state.year}&month=${this.state.month}&day=${this.state.day}`).done((data) => {
                  this.cachedEvents = data;
                  this.renderEventsList(data);
                }).fail(() => {
                  const errorTxt = this.options.i18n?.txt_errorLoading || "Error loading events";
                  this.$wrap.find(".eventCalendar-loading").text(errorTxt).addClass("error");
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
           * Iterates through the currently rendered month grid and attaches specific CSS classes
           * (`dayWithEvents`, `locked`, `special`) to day cells that contain matching events.
           * 
           * @param data The array of events to check against the active month grid.
           */
          markDaysWithEvents(data) {
            const $days = this.$wrap.find(".eventCalendar-currentMonth .eventCalendar-day");
            $days.removeClass("eventCalendar-dayWithEvents dayWithEvents locked special");
            data.forEach((event) => {
              const eventDate = this.extractEventDate(event);
              if (!eventDate) return;
              if (eventDate.year() === this.state.year && eventDate.month() === this.state.month) {
                const day = eventDate.date();
                const $dayCell = this.$wrap.find(`.eventCalendar-currentMonth .eventCalendar-day[rel="${day}"]`);
                $dayCell.addClass("eventCalendar-dayWithEvents dayWithEvents");
                if (event.isLocked) $dayCell.addClass("locked");
                if (event.isSpecial) $dayCell.addClass("special");
              }
            });
          }
          /**
           * Sorts, filters, and generates the markup for the event list displayed below the calendar grid.
           * Delegates HTML generation to `eventTemplateBuilder` if custom rendering is configured in ASP.NET MVC/Core,
           * otherwise builds standard escaped HTML links and descriptions.
           * 
           * @param data The raw array of events to process and display.
           */
          renderEventsList(data) {
            const $list = this.$wrap.find(".eventCalendar-list");
            const htmlEvents = [];
            const limit = this.options.eventsLimit || 0;
            let numOfFilteredEvents = 0;
            this.markDaysWithEvents(data);
            const sortedEvents = [...data].sort((a, b) => {
              if (!a.date) return -1;
              if (!b.date) return 1;
              if (typeof a.date === "string" && typeof b.date === "string") {
                return a.date.toLowerCase() > b.date.toLowerCase() ? 1 : -1;
              }
              return a.date > b.date ? 1 : -1;
            });
            const isDaySelected = this.state.day > 0 && this.state.month >= 0 && this.state.year >= 1970;
            sortedEvents.forEach((event) => {
              if (limit > 0 && numOfFilteredEvents >= limit) return;
              const eventDate = this.extractEventDate(event);
              const eventYear = eventDate ? eventDate.year() : null;
              const eventMonth = eventDate ? eventDate.month() : null;
              const eventDay = eventDate ? eventDate.date() : null;
              let shouldShow = false;
              if (!eventDate && this.options.showEventsWithoutDate && !isDaySelected) {
                shouldShow = true;
              } else if (eventDate) {
                const matchMonth = this.state.month < 0 || this.state.month === eventMonth;
                const matchDay = this.state.day === 0 || this.state.day === eventDay;
                const matchYear = this.state.year === 0 || this.state.year === eventYear;
                if (matchMonth && matchDay && matchYear) {
                  shouldShow = true;
                }
              }
              if (shouldShow) {
                numOfFilteredEvents++;
                if (this.options.eventTemplateBuilder && this.options.i18n) {
                  htmlEvents.push(this.options.eventTemplateBuilder(event, this.options.i18n));
                } else {
                  const safeTitle = this.escapeHtml(event.title);
                  const safeDesc = this.escapeHtml(event.description);
                  const safeUrl = this.escapeHtml(event.url);
                  const eventLinkTarget = this.options.openEventInNewWindow ? "_blank" : "_self";
                  const titleHtml = safeUrl && safeUrl !== "#" ? `<a href="${safeUrl}" target="${eventLinkTarget}" class="eventCalendar-eventTitle clearfix">${safeTitle}</a>` : `<span class="eventCalendar-eventTitle clearfix">${safeTitle}</span>`;
                  const eventDescClass = !this.options.showDescription ? "eventCalendar-hidden" : "";
                  htmlEvents.push(`
                            <li class="clearfix">
                                ${titleHtml}
                                <div class="eventCalendar-eventDesc ${eventDescClass}">${safeDesc}</div>
                            </li>
                        `);
                }
              }
            });
            if (htmlEvents.length === 0) {
              const noEventsTxt = this.options.i18n?.txt_noEvents || "No events";
              htmlEvents.push(`<li class="eventCalendar-noEvents clearfix"><p>${noEventsTxt}</p></li>`);
            }
            this.$wrap.find(".eventCalendar-loading").hide();
            const moveSpeed = this.options.moveSpeed ?? 500;
            $list.html(htmlEvents.join("")).hide().fadeIn(moveSpeed);
          }
        }
        GpsEventCalendar2.EventCalendarInstance = EventCalendarInstance;
      })(GpsEventCalendar || (GpsEventCalendar = {}));
    }
  });

  // src/jquery.eventCalendar.ts
  var require_jquery_eventCalendar = __commonJS({
    "src/jquery.eventCalendar.ts"() {
      init_EventCalendarInstance();
      var pluginFn = function(options, ...args) {
        return this.each(function() {
          let instance = $.data(this, "plugin_eventCalendar");
          if (!instance) {
            if (typeof options === "string") return;
            instance = new GpsEventCalendar.EventCalendarInstance(this, options || { jsonData: [] });
            $.data(this, "plugin_eventCalendar", instance);
          } else if (typeof options === "string") {
            switch (options) {
              case "changeLocale":
                if (args.length > 0) instance.changeLocale(args[0]);
                break;
              case "setEvents":
                if (args.length > 0) instance.setEvents(args[0], args[1] ?? true);
                break;
              case "destroy":
                instance.destroy();
                break;
            }
          }
        });
      };
      pluginFn.options = {
        jsonData: [],
        eventsLimit: 4,
        showTimeOfEvent: true,
        showDayAsWeeks: true,
        showDescription: false,
        moveSpeed: 500,
        moveOpacity: 0.15,
        startDate: void 0,
        dateTimeOffset: void 0
      };
      $.fn.eventCalendar = pluginFn;
    }
  });
  require_jquery_eventCalendar();
})();
