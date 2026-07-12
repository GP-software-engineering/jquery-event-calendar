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

