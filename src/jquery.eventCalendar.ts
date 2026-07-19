import { GpsEventCalendar } from './EventCalendarInstance';
import { GpsEventCalendar as Types, IEventCalendarPlugin } from './types';

declare const $: any;
 
/**
 * jQuery Event Calendar Plugin Wrapper.
 * Exposes the Object-Oriented EventCalendarInstance to standard jQuery chaining.
 */
const pluginFn = function(this: any, options?: Types.IEventCalendarOptions | string, ...args: any[]): any {
    return this.each(function(this: HTMLElement) {
        let instance = $.data(this, "plugin_eventCalendar") as GpsEventCalendar.EventCalendarInstance;
        
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
    moveOpacity: 0.15,
    startDate: undefined,
    dateTimeOffset: undefined
};

$.fn.eventCalendar = pluginFn;