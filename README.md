# 📅 jQuery Event Calendar

[![npm version](https://img.shields.io/npm/v/@gpsoftware/jquery-event-calendar.svg?color=blue)](https://www.npmjs.com/package/@gpsoftware/jquery-event-calendar)
[![npm downloads](https://img.shields.io/npm/dt/@gpsoftware/jquery-event-calendar.svg)](https://www.npmjs.com/package/@gpsoftware/jquery-event-calendar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

> A robust, lightweight, and fully responsive Event Calendar plugin for jQuery. 
Originally branched from v0.7 by Jaime Fernandez, this plugin has been completely refactored in modern TypeScript using Object-Oriented Programming principles to ensure ease of testing, and maintenance.

### 👉 [Click here to view the Live Demo](https://GP-software-engineering.github.io/jquery-event-calendar-modern/examples/index.html)

---

## ✨ Features
* **JSON Driven**: Load events statically via arrays or dynamically via AJAX.
* **Localization Support**: Easily extensible `i18n` configurations.
* **Responsive**: Automatically adapts to container widths.
* **Customizable Styles**: Uses CSS Custom Properties (`:root` variables) for styling
* **No Breaking UI Changes**: Drop-in replacement for older versions.

## 🚀 Installation

You can install the package via NPM:

```bash
npm install @gpsoftware/jquery-event-calendar
```

or you can include the plugin by grabbing the compiled JavaScript from the `/dist` folder.

**Dependencies required:**

* jQuery (v3.0+)
* Moment.js

```html
<link rel="stylesheet" href="css/eventCalendar.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="dist/jquery.eventCalendar.js"></script>
```

**Include the Styles:**

You can use the pre-compiled CSS from the `dist/css` folder, or import the SCSS file directly into your build pipeline to override the default Sass variables (colors, borders, etc.):

```html
<link rel="stylesheet" href="dist/css/eventCalendar.css">
```

🌍 **Internationalization (i18n)**

jQuery Event Calendar comes with built-in support for localization. The package includes translation files in the `dist/lcales/` directory.

To use a different language, include the localized script *after* the main plugin script and pass it into the configuration:

```html
<script src="dist/umd/jquery.eventCalendar.js"></script>
<script src="dist/locales/it-IT.js"></script>

<script>
  $(document).ready(function() {
    $("#calendar-wrapper").eventCalendar({
      jsonData: myEvents,
      // Pass the specific locale key and the i18n object loaded in the window
      localeKey: 'it-IT',
      i18n: window.eventCalendar_i18n['it-IT']
    });
  });
</script>
```

## 🛠️ Quick Start

Initialize the calendar by targeting an empty `<div>` and passing your options.
The plugin accepts events either as a static JavaScript array or as a URL string to fetch JSON via AJAX.<br>
Events must adhere to the IEvent interface:

```JavaScript
const myEvents = [
    {
        date: "2024-12-25 10:00:00",    // Date format depends on `jsonDateFormat` option
        title: "Christmas Track Day",   // Display name
        url: "[https://example.com](https://example.com)",     // Optional link
        description: "Join us on the track for Christmas!", 
        isLocked: false,                // Show the "cross" icon on the calendar
        isSpecial: true                 // Show the "exclamation" coin icon
    }
];

// Initialize
$('#myCalendar').eventCalendar({
    jsonData: myEvents,
    jsonDateFormat: "human", // "human" parses YYYY-MM-DD HH:MM:SS. "timestamp" parses unix ms.
    showDescription: true,
    openEventInNewWindow: true
});
```

#### Asynchronous Loading (AJAX)
If you pass a URL string instead of an array, the plugin will make a GET request to your server. It automatically appends current calendar state parameters so your backend can return paginated data:

	GET /api/events?limit=4&year=2024&month=11&day=0


```JavaScript
$('#myCalendar').eventCalendar({
    jsonData: "/api/events",
    cacheJson: false // Set to false to trigger a new AJAX call every time the user changes the month
});
```

#### Theming & Dark Mode (CSS Native Variables)

Version 2.0+ adopts CSS Custom Properties (`:root` variables) for styling. This makes the calendar easy to theme without needing to compile SCSS!

**Dark Mode is supported out-of-the-box.** The calendar automatically detects the user's OS preferences `(prefers-color-scheme: dark)` and flips the color palette seamlessly.

**How to force a mode**

If you want to force a mode regardless the local OS configuration, you can use this js code:

```JavaScript
// Toggle theme and enforce it globally via data attribute
const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
document.documentElement.setAttribute('data-theme', newTheme);

// Toggle styles for the demo page background
$('body').toggleClass('force-dark', newTheme === 'dark');
```

**Custom theme**

If you want to create a custom theme or integrate the calendar into your brand colors, simply override the CSS variables in your own stylesheet:

```css
/* Your custom stylesheet (loaded after eventCalendar.css) */
:root {
    /* Change the main theme color to purple */
    --ec-title-bg: #6f42c1;
    --ec-event-title-color: #6f42c1;
    
    /* Change the current day highlight to red */
    --ec-today-bg: #dc3545;
}
```

Here is the list of the most commonly modified variables:

- `--ec-title-bg`: Background color of the top bar (Month/Year)
- `--ec-event-title-color`: Text color for events in the list
- `--ec-today-bg`: Highlight color for the current day
- `--ec-event-bg`: Highlight color for days containing events

---

## 🤝 Development & Contributing

If you want to contribute or modify the source:

1. Clone the repository.
2. Run `npm install` to grab all development dependencies.
3. Run `npm run build` to compile the TypeScript files into the `/dist` folder.
4. Run `npm run test` to execute the Jest test suites.

Maintained with ❤️ by GP Software Engineering.
