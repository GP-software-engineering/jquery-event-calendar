import { IEventCalendarOptions } from "./types";
/**
 * Core Class representing an isolated Event Calendar instance.
 * It handles DOM manipulation, event rendering, state management,
 * and synchronous localization configuration using in-memory bundles.
 */
export declare class EventCalendarInstance {
    private $wrap;
    private options;
    private state;
    private cachedEvents;
    private directionLeftMove;
    /**
     * Initializes a new Event Calendar instance.
     *
     * @param element The physical DOM element to attach the calendar to.
     * @param options The configuration options provided by the user.
     */
    constructor(element: HTMLElement, options: IEventCalendarOptions);
    /**
     * Public API method to change the language on the fly without reloading events from the server.
     * Translations must already be bundled and available in window.eventCalendar_i18n.
     *
     * @param newLocale The new locale string (e.g., 'es-ES' or 'it').
     */
    changeLocale(newLocale: string): void;
    /**
     * Merges user-provided options with the plugin's default options.
     *
     * @param options User-provided options.
     * @returns A deeply merged options object.
     */
    private mergeOptions;
    /**
     * Bootstraps the application by rendering the initial DOM structure,
     * attaching event listeners, determining the correct locale, and initializing the UI.
     */
    private init;
    /**
     * Tries to resolve a given locale string against loaded dictionaries.
     * Performs an exact match first, then falls back to base language match (e.g., 'it' -> 'it-IT').
     *
     * @param locale Requested locale.
     * @returns The resolved exact key in the dictionary, or null if unsupported.
     */
    private resolveLocale;
    /**
     * Processes the requested locale and updates the calendar state.
     *
     * @param requestedLocale The target locale string.
     * @param isRuntimeChange True if triggered manually after init; false if during initialization.
     */
    private applyLocaleAndRender;
    /**
     * Physically applies the translation data, configures Moment.js, and redraws the UI.
     *
     * @param localeKey Exact key in the dictionary (e.g. 'it-IT').
     * @param i18nData Translation data object.
     */
    private applyActualLocale;
    /**
     * Constructs the main HTML skeleton inside the wrapper element.
     */
    private buildDOMStructure;
    /**
     * Binds click and keyboard events to the dynamically generated DOM elements.
     */
    private attachEventListeners;
    /**
     * Animates the transition between months.
     * @param direction Target direction to slide the calendar.
     */
    private changeMonth;
    /**
     * Builds and renders the grid for the requested month.
     * @param monthOrDirection Direction to render relative to the current state.
     */
    private renderMonth;
    /**
     * Updates the subtitle text based on the current view state.
     */
    private updateSubtitle;
    /**
     * Fetches events via AJAX or reads from the local array.
     */
    private fetchAndRenderEvents;
    /**
     * Generates and appends the HTML list of events.
     * @param data Array of events to be displayed.
     */
    private renderEventsList;
}
