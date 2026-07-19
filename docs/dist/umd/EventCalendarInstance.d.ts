import { GpsEventCalendar as Types } from "./types";
export declare namespace GpsEventCalendar {
    /**
     * Core Class representing an isolated Event Calendar instance.
     */
    class EventCalendarInstance {
        private options;
        private state;
        private cachedEvents;
        private directionLeftMove;
        /** The outermost root DOM element (wrapped in jQuery) holding this specific calendar instance. */
        private readonly $wrap;
        private readonly instanceId;
        private readonly eventNamespace;
        /**
         * Initializes a new instance of the EventCalendar plugin.
         * @param element The target DOM element where the calendar will be rendered.
         * @param options Configuration options for the calendar instance.
         */
        constructor(element: HTMLElement, options: Types.IEventCalendarOptions);
        /**
         * Dynamically updates the dataset of the calendar without destroying the DOM structure.
         * Optionally calculates and navigates directly to the first month containing events.
         * @param newEvents The new array of events to render.
         * @param jumpToFirstMonth If true, automatically navigates the calendar view to the first available event month.
         */
        setEvents(newEvents: Types.IEvent[], jumpToFirstMonth?: boolean): void;
        /**
         * Changes the active localization language at runtime and refreshes the calendar view.
         * @param newLocale The new locale string (e.g., 'it-IT' or 'en-US').
         */
        changeLocale(newLocale: string): void;
        /**
         * Destroys the calendar instance, removes DOM structures, and unbinds all namespaced events.
         */
        destroy(): void;
        /**
         * Simple method to sanitizes user-provided or external string inputs by (when user not use templates)
         */
        private escapeHtml;
        /**
         * Extracts and parses the event date based on the plugin configuration.
         * Restored dateTimeOffset logic from the legacy plugin.
         */
        private extractEventDate;
        /**
         * Performs a deep merge of custom initialization options over the global plugin defaults.
         *
         * @param options User-provided configuration overrides.
         * @returns The fully merged configuration object.
         */
        private mergeOptions;
        /**
         * Initializes the core DOM scaffolding, binds event listeners, sets up responsive window
         * tracking, and triggers the initial render based on the provided or default starting date.
         */
        private init;
        /**
         * Scans the provided events array to find the earliest future date containing an event.
         * If found, updates the internal state (year, month) so the calendar immediately opens
         * on a month with relevant data instead of an empty current month.
         *
         * @param events The array of available events to scan.
         */
        private applyFirstMonthWithEvents;
        /**
         * Resolves the closest matching locale string against the globally available i18n dictionaries.
         * Falls back from specific locales (e.g., 'it-IT') to general language codes (e.g., 'it').
         */
        private resolveLocale;
        /**
         * Resolves locale dependencies and orchestrates either an initial setup or a runtime language switch.
         * Handles error feedback if a requested localization dictionary is missing.
         *
         * @param requestedLocale The target locale string to apply.
         * @param isRuntimeChange Indicates whether this is invoked dynamically after initialization.
         */
        private applyLocaleAndRender;
        /**
         * Configures Moment.js with the selected locale, determines first-day-of-week rules,
         * triggers initial month rendering, and either displays cached data or initiates a network fetch.
         *
         * @param localeKey The verified locale identifier.
         * @param i18nData The localized strings and formatting rules dictionary.
         */
        private applyActualLocale;
        /**
         * Constructs the foundational HTML layout inside the root `$wrap` container,
         * defining accessibility attributes (`aria-live`), the slider viewport, and the event list wrapper.
         */
        private buildDOMStructure;
        /**
         * Binds all interactive DOM handlers using namespaced events to prevent leaking.
         * Includes support for mouse clicks, keyboard navigation (WCAG accessibility), and touch swipes.
         */
        private attachEventListeners;
        /**
         * Orchestrates the horizontal sliding animation when navigating between months.
         * Animates the opacity and left position of the old month container before removing it from the DOM.
         *
         * @param direction The navigation direction ('next' or 'prev').
         */
        private changeMonth;
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
        private renderMonth;
        /**
         * Updates the text of the subtitle above the event list to reflect whether the user
         * is viewing events for a specifically selected day or viewing general upcoming events.
         */
        private updateSubtitle;
        /**
         * Fetches event data from a remote JSON URL (if configured as a string) or retrieves
         * items directly from the in-memory array, caching results when appropriate.
         */
        private fetchAndRenderEvents;
        /**
         * Iterates through the currently rendered month grid and attaches specific CSS classes
         * (`dayWithEvents`, `locked`, `special`) to day cells that contain matching events.
         *
         * @param data The array of events to check against the active month grid.
         */
        private markDaysWithEvents;
        /**
         * Sorts, filters, and generates the markup for the event list displayed below the calendar grid.
         * Delegates HTML generation to `eventTemplateBuilder` if custom rendering is configured in ASP.NET MVC/Core,
         * otherwise builds standard escaped HTML links and descriptions.
         *
         * @param data The raw array of events to process and display.
         */
        private renderEventsList;
    }
}
