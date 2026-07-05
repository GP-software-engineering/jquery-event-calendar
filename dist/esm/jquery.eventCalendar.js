"use strict";
/*!
    jquery.eventCalendar.js
    version: 2.0.3
    author: Gianpiero Caretti (@gpcaretti) / Refactored
    company: GP software engineering
    url: https://www.gpsoftware.it
*/
/**
 * Core Class representing an isolated Event Calendar instance.
 */
class EventCalendarInstance {
    $wrap;
    options;
    state;
    cachedEvents = null;
    directionLeftMove = 300;
    /**
     * Initializes the calendar instance.
     * @param element The DOM element to attach the calendar to.
     * @param options Configuration options.
     */
    constructor(element, options) {
        this.$wrap = $(element);
        this.options = this.mergeOptions(options);
        this.state = { year: 0, month: -1, day: 0, direction: "" };
        this.init();
    }
    /**
     * Merges user-provided options with default plugin options.
     * @param options User-provided options.
     * @returns A deeply merged options object.
     */
    mergeOptions(options) {
        const defaults = $.fn.eventCalendar.options;
        return $.extend(true, {}, defaults, options);
    }
    /**
     * Bootstraps the application by rendering the DOM and fetching events.
     */
    init() {
        // Register moment.js locale dynamically if i18n object is provided
        if (this.options.localeKey) {
            const localeName = this.options.localeKey.toLowerCase();
            if (this.options.i18n?.moment) {
                // Check if the locale has already been loaded in Moment.js
                const loadedLocales = typeof moment.locales === 'function' ? moment.locales() : [];
                if (loadedLocales.indexOf(localeName) >= 0 && typeof moment.updateLocale === 'function') {
                    moment.updateLocale(localeName, this.options.i18n.moment);
                }
                else {
                    moment.defineLocale(localeName, this.options.i18n.moment);
                }
            }
            else {
                moment.locale(localeName);
            }
        }
        this.buildDOMStructure();
        this.attachEventListeners();
        // Calculate dynamic width to handle slide animations properly
        this.directionLeftMove = this.$wrap.width() || 300;
        $(window).on('resize', () => { this.directionLeftMove = this.$wrap.width() || 300; });
        this.renderMonth("current");
        this.fetchAndRenderEvents();
    }
    /**
     * Constructs the main HTML skeleton inside the wrapper element.
     */
    buildDOMStructure() {
        const loadingTxt = this.options.i18n?.txt_loading || "loading...";
        this.$wrap.addClass('eventCalendar-wrap').html(`
            <div class='eventCalendar-slider'></div>
            <div class='eventCalendar-list-wrap'>
                <p class='eventCalendar-subtitle'></p>
                <span class='eventCalendar-loading'>${loadingTxt}</span>
                <div class='eventCalendar-list-content ${this.options.eventsScrollable ? "scrollable" : ""}'>
                    <ul class='eventCalendar-list'></ul>
                </div>
            </div>
        `);
    }
    /**
     * Binds click events to the dynamically generated DOM elements.
     */
    attachEventListeners() {
        this.$wrap.on('click', '[name="arrow"]', (e) => {
            e.preventDefault();
            const direction = $(e.currentTarget).attr('data-dir');
            this.changeMonth(direction);
        });
        this.$wrap.on('click', 'li[id^="dayList_"] a', (e) => {
            e.preventDefault();
            const day = parseInt($(e.currentTarget).parent().attr('rel') || "0", 10);
            this.state = { ...this.state, day, direction: 'day' };
            this.fetchAndRenderEvents();
            // Trigger external callback if provided
            if (this.options.callbacks?.changeDay) {
                this.options.callbacks.changeDay(new Date(this.state.year, this.state.month, day));
            }
        });
        this.$wrap.on('click', '.eventCalendar-eventTitle', (e) => {
            if (!this.options.showDescription) {
                e.preventDefault();
                const $desc = $(e.currentTarget).siblings('.eventCalendar-eventDesc');
                // Inject the 'Go to event' button dynamically if missing
                if (!$desc.find('a.bt').length) {
                    const url = $(e.currentTarget).attr('href');
                    const target = $(e.currentTarget).attr('target') || "_self";
                    const gotoTxt = this.options.i18n?.txt_GoToEventUrl || "Go to event";
                    $desc.append(`<a href="${url}" target="${target}" class="bt">${gotoTxt}</a>`);
                }
                if ($desc.is(':visible')) {
                    $desc.slideUp();
                }
                else {
                    // Close sibling descriptions to keep the UI clean
                    if (this.options.onlyOneDescription) {
                        this.$wrap.find('.eventCalendar-eventDesc').slideUp();
                    }
                    $desc.slideDown();
                }
            }
        });
    }
    /**
     * Animates the transition between months.
     * @param direction Target direction to slide the calendar.
     */
    changeMonth(direction) {
        this.renderMonth(direction);
        const moveOperator = direction === "next" ? "-=" : "+=";
        const moveOpacity = this.options.moveOpacity ?? 0.15;
        const moveSpeed = this.options.moveSpeed ?? 500;
        // Animate out the old month grid
        this.$wrap.find('.eventCalendar-monthWrap.eventCalendar-oldMonth').animate({
            opacity: moveOpacity,
            left: `${moveOperator}${this.directionLeftMove}`
        }, moveSpeed, function () {
            $(this).remove();
        });
    }
    /**
     * Builds and renders the grid for the requested month, including leading and trailing days.
     * @param monthOrDirection Direction to render relative to the current state.
     */
    renderMonth(monthOrDirection) {
        const $slider = this.$wrap.find('.eventCalendar-slider');
        const date = new Date();
        this.$wrap.find('.eventCalendar-monthWrap.eventCalendar-currentMonth')
            .removeClass('eventCalendar-currentMonth')
            .addClass('eventCalendar-oldMonth');
        if (monthOrDirection !== "current") {
            date.setFullYear(this.state.year, this.state.month, 1);
            date.setMonth(date.getMonth() + (monthOrDirection === "prev" ? -1 : 1));
        }
        this.state.year = date.getFullYear();
        this.state.month = date.getMonth();
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
                <a name='arrow' data-dir='prev' href='#' class='eventCalendar-arrow eventCalendar-prev'><span>${txtPrev}</span></a>
                <a name='arrow' data-dir='next' href='#' class='eventCalendar-arrow eventCalendar-next'><span>${txtNext}</span></a>
            `);
        }
        const $daysList = $newMonthWrap.find('.eventCalendar-daysList');
        if (this.options.showDayAsWeeks) {
            $daysList.addClass('showDayNames');
            let dayNames = this.options.i18n?.dayNamesShort || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            // Shift Sunday to the end of the array if the week starts on Monday
            if (this.options.startWeekOnMonday) {
                dayNames = [...dayNames.slice(1), dayNames[0]];
            }
            let dayHeadersHtml = "";
            dayNames.forEach(name => {
                dayHeadersHtml += `<li class='eventCalendar-day-header'>${name}</li>`;
            });
            $daysList.append(dayHeadersHtml);
        }
        // Calculate leading spaces (days from the previous month)
        let firstDayOfMonth = new Date(this.state.year, this.state.month, 1).getDay();
        if (this.options.startWeekOnMonday) {
            firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        }
        if (this.options.showDayAsWeeks) {
            // Get the total number of days in the previous month
            const prevMonthDays = new Date(this.state.year, this.state.month, 0).getDate();
            // Append muted days from the previous month
            for (let i = 0; i < firstDayOfMonth; i++) {
                const dayNum = prevMonthDays - firstDayOfMonth + 1 + i;
                $daysList.append(`<li class='eventCalendar-day eventCalendar-empty'><span class='eventCalendar-empty-date'>${dayNum}</span></li>`);
            }
        }
        const daysInMonth = new Date(this.state.year, this.state.month + 1, 0).getDate();
        const currentDay = new Date().getDate();
        const isCurrentMonth = date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
        // Append actual clickable days for the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = isCurrentMonth && day === currentDay ? "today" : "";
            $daysList.append(`<li id='dayList_${day}' rel='${day}' class='eventCalendar-day ${isToday}'><a href='#'>${day}</a></li>`);
        }
        // Calculate and append trailing spaces (days for the next month)
        if (this.options.showDayAsWeeks) {
            const totalCells = firstDayOfMonth + daysInMonth;
            const tailDays = (7 - (totalCells % 7)) % 7;
            // Append muted days for the next month
            for (let i = 1; i <= tailDays; i++) {
                $daysList.append(`<li class='eventCalendar-day eventCalendar-empty'><span class='eventCalendar-empty-date'>${i}</span></li>`);
            }
        }
        $slider.append($newMonthWrap);
        $slider.css('height', $newMonthWrap.height() + 'px');
        if (monthOrDirection !== "current") {
            this.state.direction = monthOrDirection;
            this.fetchAndRenderEvents();
        }
    }
    /**
     * Updates the subtitle text based on the current view state (monthly vs daily events).
     */
    updateSubtitle() {
        const $subtitle = this.$wrap.find('.eventCalendar-subtitle');
        if (this.state.direction === 'day') {
            const dateObj = new Date(this.state.year, this.state.month, this.state.day);
            const dateStr = moment(dateObj).format('LL');
            const prevTxt = this.options.i18n?.txt_SpecificEvents_prev || "";
            const afterTxt = this.options.i18n?.txt_SpecificEvents_after || "events:";
            $subtitle.text(`${prevTxt} ${dateStr} ${afterTxt}`);
        }
        else {
            const nextTxt = this.options.i18n?.txt_NextEvents || "Next events:";
            $subtitle.text(nextTxt);
        }
    }
    /**
     * Fetches events via AJAX or reads from the local array and triggers rendering.
     */
    fetchAndRenderEvents() {
        this.$wrap.find('.eventCalendar-loading').fadeIn();
        this.updateSubtitle();
        if (typeof this.options.jsonData === "string") {
            // Check cache before performing a new AJAX request
            if (!this.options.cacheJson || !this.cachedEvents) {
                $.getJSON(`${this.options.jsonData}?limit=${this.options.eventsLimit}&year=${this.state.year}&month=${this.state.month}&day=${this.state.day}`)
                    .done((data) => {
                    this.cachedEvents = data;
                    this.renderEventsList(data);
                })
                    .fail(() => {
                    const errorTxt = this.options.i18n?.txt_errorLoading || "Error loading events";
                    this.$wrap.find('.eventCalendar-loading').text(errorTxt).addClass("error");
                });
            }
            else {
                this.renderEventsList(this.cachedEvents);
            }
        }
        else {
            this.cachedEvents = this.options.jsonData;
            this.renderEventsList(this.cachedEvents);
        }
    }
    /**
     * Generates and appends the HTML list of events based on fetched data.
     * @param data Array of events to be displayed.
     */
    renderEventsList(data) {
        const $list = this.$wrap.find('.eventCalendar-list');
        let htmlEvents = [];
        data.forEach((event, index) => {
            const eventLinkTarget = this.options.openEventInNewWindow ? '_blank' : '_self';
            // Render title as an anchor tag if URL is provided, otherwise as a span
            const eventTitle = event.url
                ? `<a href="${event.url}" target="${eventLinkTarget}" class="eventCalendar-eventTitle clearfix">${event.title}</a>`
                : `<span class="eventCalendar-eventTitle clearfix">${event.title}</span>`;
            const eventDescClass = !this.options.showDescription ? 'eventCalendar-hidden' : '';
            htmlEvents.push(`
                <li id="event_${index}" class="clearfix">
                    ${eventTitle}
                    <div class="eventCalendar-eventDesc ${eventDescClass}">${event.description}</div>
                </li>
            `);
        });
        // Show fallback message if dataset is empty
        if (htmlEvents.length === 0) {
            const noEventsTxt = this.options.i18n?.txt_noEvents || "No events";
            htmlEvents.push(`<li class="eventCalendar-noEvents clearfix"><p>${noEventsTxt}</p></li>`);
        }
        this.$wrap.find('.eventCalendar-loading').hide();
        const moveSpeed = this.options.moveSpeed ?? 500;
        $list.html(htmlEvents.join('')).hide().fadeIn(moveSpeed);
    }
}
// ============================================================================
// JQUERY PLUGIN ATTACHMENT
// ============================================================================
const pluginFn = function (options) {
    return this.each(function () {
        if (!$.data(this, "plugin_eventCalendar")) {
            $.data(this, "plugin_eventCalendar", new EventCalendarInstance(this, options || { jsonData: [] }));
        }
    });
};
// Default Global Options
pluginFn.options = {
    jsonData: [],
    eventsLimit: 4,
    localeKey: "en",
    showTimeOfEvent: true,
    showDayAsWeeks: true,
    showDescription: false,
    moveSpeed: 500,
    moveOpacity: 0.15
};
$.fn.eventCalendar = pluginFn;
