# What's New in v2.4.0

This release adds the `setEvents` method to the plugin to dynamically updates the dataset of the calendar without destroying the DOM structure, increasing the calendar speed.

# What's New in v2.3.2

This release addresses a bug on small images not displayed when an event was marked with bugs `isSpecial = true `.

---

# What's New in v2.3.1

This release addresses critical bugs introduced during the architectural overhaul and restores full backward compatibility with legacy configuration options.

### 🐛 Bug Fixes

* **Event Filtering**: Restored the strict event filtering logic. Clicking on a specific day correctly filters and displays only the events for that day, rather than the entire month.
* **Grid Highlighting**: Fixed an issue where days with events were not properly highlighted on the calendar grid. Resolved DOM ID collisions by safely targeting cells via the `rel` attribute.

### ⏪ Legacy Compatibility

* **Restored Options**: Brought back `startDate` and `dateTimeOffset` configuration options to ensure seamless updates for legacy implementations.
* **Cleanup**: Removed the phantom `changeMonth` callback from default options as it was never internally triggered.

---

# What's New in v2.3.0

This release elevates the plugin to enterprise standards, focusing on memory safety, mobile UX, security, and rendering flexibility.

### 🚀 Core Architecture & Security

* **Namespaced API**: All internal types and instances are now securely encapsulated within the `GpsEventCalendar` namespace, preventing any global scope pollution.
* **Memory Leak Prevention**: Introduced the `destroy()` runtime method. It safely unbinds all delegated and window-level events tied to specific instances, making the plugin highly reliable for Single Page Applications (SPAs).
* **XSS Protection**: The default internal event builder now rigorously sanitizes `title`, `description`, and `url` to prevent Cross-Site Scripting vulnerabilities when rendering backend data.

### 📱 User Experience

* **Native Swipe Support**: Added touch event listeners to the calendar slider. Mobile users can now naturally swipe left and right to navigate between months.
* **Advanced Accessibility (A11y)**: Improved Screen Reader integration by dynamically toggling `aria-current="date"` for today's date and `aria-selected` upon user interaction.

### 🧩 Flexibility

* **Custom Event Templates**: Introduced the `eventTemplateBuilder` option. Dev

---

# What's New in v2.2.0

This release introduces better support for multi language, included the dynamically load of the language configuration.

---

# What's New in v2.1.0

This release introduces full native accessibility, automated documentation, and End-to-End testing readiness.

### 🌍 Locales (i18n)

* **Multi language and date/time format supports**: Added Italian, French and other languages and date and time support.

### ♿ Accessibility (A11y)

* **Screen Reader Support**: Added robust ARIA attributes (`aria-live`, `aria-label`, `role="button"`) dynamically to the DOM. Screen readers now properly announce month changes and day interactions.
* **Keyboard Navigation**: Full keyboard support implemented. Users can now navigate calendar days and trigger events using `Tab`, `Enter`, and `Space` keys. Added specific `:focus-visible` styling for visual feedback without penalizing mouse users.

### 🛠️ Tooling & Testing

* **TypeDoc Integration**: Prepared the architecture for automated API documentation generation directly from JSDoc comments.
* **Playwright E2E**: Bootstrapped End-to-End visual testing to ensure UI integrity across different browsers (Chromium, Firefox, WebKit).

---

# What's New in v2.0.2

Setup CI/CD workflow and bump version to 2.0.2.
-----------------------------------------------

# What's New in v2.0.1

Just renamed the package to include the organization.
-----------------------------------------------------

# What's New in v2.0.0

Version 2.0.0 is a massive architectural overhaul of the jQuery Event Calendar plugin. While the external API and DOM outputs remain strictly 100% isofunctional with previous versions to ensure backward compatibility, the internal engine has been completely rebuilt.

### 🚀 Major Highlights

* **TypeScript Migration**: The entire source code is now strongly typed (TypeScript 5+), preventing runtime errors and providing full IntelliSense support.
* **Object-Oriented Architecture**: Eradicated the old global variables and massive jQuery `each` loops. The plugin now uses a highly encapsulated `EventCalendarInstance` class. State is now managed internally rather than relying on DOM attributes (e.g., `data-current-year`).
* **Modern ECMAScript**: Replaced legacy jQuery utilities (`$.each`, `$.grep`) with modern, highly optimized array methods (`forEach`, `filter`). String building now uses Template Literals instead of clunky regex replaces.
* **Testability**: The decoupling of the logic from direct DOM manipulation allows for rapid and reliable testing using `Jest` and `JSDOM`.

### 🔧 Developer Experience

* Added `package.json` and `tsconfig.json` for a standardized build process.
* Added an automated testing suite setup. Run `npm run test` to verify functionality.

