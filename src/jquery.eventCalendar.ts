/*!
    jquery.eventCalendar.js
    version: 2.1.0
    author: Gianpiero Caretti (@gpcaretti) / Refactored
    company: GP software engineering
    url: https://www.gpsoftware.it
*/

import { EventCalendarInstance } from './EventCalendarInstance';
import { IEventCalendarOptions, IEventCalendarPlugin } from './types';

declare const $: any;

/**
 * jQuery Event Calendar Plugin Wrapper
 */
const pluginFn = function(this: any, options?: IEventCalendarOptions): any {
    return this.each(function(this: HTMLElement) {
        if (!$.data(this, "plugin_eventCalendar")) {
            $.data(this, "plugin_eventCalendar", new EventCalendarInstance(this, options || { jsonData: [] }));
        }
    });
} as IEventCalendarPlugin;

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