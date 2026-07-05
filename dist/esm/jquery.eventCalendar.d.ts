/*!
    jquery.eventCalendar.js
    version: 2.0.3
    author: Gianpiero Caretti (@gpcaretti) / Refactored
    company: GP software engineering
    url: https://www.gpsoftware.it
*/
declare const moment: any;
declare namespace EventCalendar {
    /**
     * Represents a single event object to be rendered on the calendar.
     */
    interface IEvent {
        /** Date of the event. Can be a timestamp or a formatted string. */
        date?: number | string;
        /** Optional offset for the event date calculation. */
        offset?: number;
        /** Title of the event displayed in the list. */
        title?: string;
        /** URL to redirect the user when the event title is clicked. */
        url?: string;
        /** Description of the event displayed when the title is toggled. */
        description?: string;
        /** Indicates if the event is locked (displays a cross icon). */
        isLocked?: boolean;
        /** Indicates if the event is special (displays an exclamation mark icon). */
        isSpecial?: boolean;
    }
    /**
     * Localization settings for text strings and date formats.
     */
    interface II18n {
        locale: string;
        monthNames: string[];
        monthNamesShort: string[];
        dayNames: string[];
        dayNamesShort: string[];
        txt_noEvents: string;
        txt_SpecificEvents_prev: string;
        txt_SpecificEvents_after: string;
        txt_next: string;
        txt_prev: string;
        txt_NextEvents: string;
        txt_GoToEventUrl: string;
        txt_loading: string;
        txt_errorLoading?: string;
        txt_undefinedDate: string;
        moment?: any;
    }
    /**
     * Configuration options for initializing the EventCalendar plugin.
     */
    interface IEventCalendarOptions {
        /** Array of events or a URL string to fetch events via AJAX. */
        jsonData: IEvent[] | string;
        /** Cache JSON results to avoid multiple AJAX calls for the same month. */
        cacheJson?: boolean;
        /** Locale key (e.g., 'en-US') to load specific translations. */
        localeKey?: string;
        /** Direct object for i18n configurations. */
        i18n?: II18n;
        /** Maximum number of events to show in the list. */
        eventsLimit?: number;
        /** Display the event time next to the title. */
        showTimeOfEvent?: boolean;
        /** Display days in a traditional grid/week layout. */
        showDayAsWeeks?: boolean;
        /** Display empty days from previous/next months to fill the grid. */
        showDaysOfOtherMonths?: boolean;
        /** Force the week to start on Monday instead of Sunday. */
        startWeekOnMonday?: boolean;
        /** Display day names (Mon, Tue, etc.) in the calendar header. */
        showDayNameInCalendar?: boolean;
        /** Display events that do not have a specific date assigned. */
        showEventsWithoutDate?: boolean;
        /** Show event descriptions by default. */
        showDescription?: boolean;
        /** Automatically close other descriptions when opening a new one. */
        onlyOneDescription?: boolean;
        /** Initialize the calendar on the first upcoming month containing events. */
        showFirstMonthWithEvents?: boolean;
        /** Open event URLs in a new browser tab. */
        openEventInNewWindow?: boolean;
        /** Enable scrollbar for the events list container. */
        eventsScrollable?: boolean;
        /** Expected format of the incoming event dates ('timestamp' or 'human'). */
        jsonDateFormat?: "timestamp" | "human";
        /** Animation speed in milliseconds for month transitions. */
        moveSpeed?: number;
        /** Opacity level during the month transition animation. */
        moveOpacity?: number;
        /** Optional hooks for user interaction events. */
        callbacks?: {
            /** Fired when a user clicks on a specific day. */
            changeDay?: (date: Date) => void;
            /** Fired when the month is changed. */
            changeMonth?: () => void;
        };
    }
}
/**
 * Extends jQuery plugin structure to include default options.
 */
interface IEventCalendarPlugin {
    (options?: EventCalendar.IEventCalendarOptions): JQuery;
    options: EventCalendar.IEventCalendarOptions;
}
/**
 * Injects the eventCalendar method into the global JQuery interface.
 */
interface JQuery {
    eventCalendar: IEventCalendarPlugin;
}
/**
 * Tracks the current active state of the calendar view.
 */
interface ICalendarState {
    year: number;
    month: number;
    day: number;
    direction: "current" | "next" | "prev" | "month" | "day" | "";
}
/**
 * Core Class representing an isolated Event Calendar instance.
 */
declare class EventCalendarInstance {
    private $wrap;
    private options;
    private state;
    private cachedEvents;
    private directionLeftMove;
    /**
     * Initializes the calendar instance.
     * @param element The DOM element to attach the calendar to.
     * @param options Configuration options.
     */
    constructor(element: HTMLElement, options: EventCalendar.IEventCalendarOptions);
    /**
     * Merges user-provided options with default plugin options.
     * @param options User-provided options.
     * @returns A deeply merged options object.
     */
    private mergeOptions;
    /**
     * Bootstraps the application by rendering the DOM and fetching events.
     */
    private init;
    /**
     * Constructs the main HTML skeleton inside the wrapper element.
     */
    private buildDOMStructure;
    /**
     * Binds click events to the dynamically generated DOM elements.
     */
    private attachEventListeners;
    /**
     * Animates the transition between months.
     * @param direction Target direction to slide the calendar.
     */
    private changeMonth;
    /**
     * Builds and renders the grid for the requested month, including leading and trailing days.
     * @param monthOrDirection Direction to render relative to the current state.
     */
    private renderMonth;
    /**
     * Updates the subtitle text based on the current view state (monthly vs daily events).
     */
    private updateSubtitle;
    /**
     * Fetches events via AJAX or reads from the local array and triggers rendering.
     */
    private fetchAndRenderEvents;
    /**
     * Generates and appends the HTML list of events based on fetched data.
     * @param data Array of events to be displayed.
     */
    private renderEventsList;
}
declare const pluginFn: IEventCalendarPlugin;
