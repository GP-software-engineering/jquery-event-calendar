import { EventCalendarInstance } from './EventCalendarInstance';
import { IEventCalendarOptions, IEventCalendarPlugin } from './types';

declare const $: any;
 
/**
 * jQuery Event Calendar Plugin Wrapper.
 * Exposes the Object-Oriented EventCalendarInstance to standard jQuery chaining.
 */
const pluginFn = function(this: any, options?: IEventCalendarOptions | string, ...args: any[]): any {
    return this.each(function(this: HTMLElement) {
        let instance = $.data(this, "plugin_eventCalendar") as EventCalendarInstance;
        
        if (!instance) {
            // Prevent attempting to call public methods on uninitialized DOM elements
            if (typeof options === "string") return; 
            
            instance = new EventCalendarInstance(this, options || { jsonData: [] });
            $.data(this, "plugin_eventCalendar", instance);
        } else if (typeof options === "string") {
            // Public method dispatcher
            if (options === "changeLocale" && args.length > 0) {
                instance.changeLocale(args[0]);
            }
        }
    });
} as IEventCalendarPlugin;

/**
 * Global Default Options.
 * Can be overridden globally before initialization.
 */
pluginFn.options = {
    jsonData: [],
    eventsLimit: 4,
    showTimeOfEvent: true,
    showDayAsWeeks: true,
    showDescription: false,
    moveSpeed: 500,
    moveOpacity: 0.15
};

$.fn.eventCalendar = pluginFn;