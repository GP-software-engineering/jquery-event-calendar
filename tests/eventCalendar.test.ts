import $ from 'jquery';
// Expose jQuery globally for the plugin
(global as any).$ = $;
(global as any).jQuery = $;

import moment from 'moment';
(global as any).moment = moment;

// Mock window for JSDOM environment if needed by the i18n scripts
if (!(global as any).window) {
    (global as any).window = global;
}

// 1. CRITICAL FIX: Load the English locale into the test environment!
// This populates the window.eventCalendar_i18n object so the plugin can render.
require('../src/i18n/en-US');

// Require the plugin code to attach it to jQuery
require('../src/jquery.eventCalendar');

describe('jQuery Event Calendar Plugin', () => {
    beforeEach(() => {
        // Setup a clean DOM before each test
        document.body.innerHTML = `
            <div id="calendar-container"></div>
        `;
    });

    test('should initialize the calendar container with proper classes', () => {
        const $container = $('#calendar-container');
        
        // Act: Initialize plugin with an empty array of events
        ($container as any).eventCalendar({
            jsonData: []
        });

        // Assert: Check if the plugin built the base DOM structure
        expect($container.hasClass('eventCalendar-wrap')).toBeTruthy();
        expect($container.find('.eventCalendar-list-wrap').length).toBe(1);
        expect($container.find('.eventCalendar-loading').length).toBe(1);
    });

    test('should render the slider and month title', () => {
        const $container = $('#calendar-container');
        
        // Act: Initialize plugin
        ($container as any).eventCalendar({
            jsonData: []
        });

        // Assert: Check if the grid and title are rendered after locale is applied
        expect($container.find('.eventCalendar-slider').length).toBe(1);
        expect($container.find('.eventCalendar-currentTitle').length).toBe(1);
    });
});