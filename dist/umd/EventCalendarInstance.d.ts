import { IEventCalendarOptions } from './types';
/**
 * Core Class representing an isolated Event Calendar instance.
 */
export declare class EventCalendarInstance {
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
    constructor(element: HTMLElement, options: IEventCalendarOptions);
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
