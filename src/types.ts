/**
 * Represents a single event object to be rendered on the calendar.
 */
export interface IEvent {
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
export interface II18n {
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
export interface IEventCalendarOptions {
    /** Array of events or a URL string to fetch events via AJAX. */
    jsonData: IEvent[] | string;
    /** Cache JSON results to avoid multiple AJAX calls for the same month. */
    cacheJson?: boolean;
    /** Locale string (e.g., 'en-US', 'it-IT'). Defaults to browser language if omitted. */
    locale?: string;
    /** Internal i18n object. Do not set this manually. */
    i18n?: II18n;
    eventsLimit?: number;
    showTimeOfEvent?: boolean;
    showDayAsWeeks?: boolean;
    showDaysOfOtherMonths?: boolean;
    startWeekOnMonday?: boolean;
    showDayNameInCalendar?: boolean;
    showEventsWithoutDate?: boolean;
    showDescription?: boolean;
    onlyOneDescription?: boolean;
    showFirstMonthWithEvents?: boolean;
    openEventInNewWindow?: boolean;
    eventsScrollable?: boolean;
    jsonDateFormat?: "timestamp" | "human";
    moveSpeed?: number;
    moveOpacity?: number;
    callbacks?: {
        changeDay?: (date: Date) => void;
        changeMonth?: () => void;
    };
}

/**
 * Tracks the current active state of the calendar view.
 */
export interface ICalendarState {
    year: number;
    month: number;
    day: number;
    direction: "current" | "next" | "prev" | "month" | "day" | "";
}

/**
 * Extends jQuery plugin structure to include default options.
 */
export interface IEventCalendarPlugin {
    (options?: IEventCalendarOptions | string, ...args: any[]): JQuery;
    options: IEventCalendarOptions;
}

declare global {
    interface JQuery {
        eventCalendar: IEventCalendarPlugin;
    }
}