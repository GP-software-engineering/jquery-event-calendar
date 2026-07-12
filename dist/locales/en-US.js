"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // src/i18n/en-US.ts
  var require_en_US = __commonJS({
    "src/i18n/en-US.ts"() {
      if (!window.eventCalendar_i18n) {
        window.eventCalendar_i18n = {};
      }
      window.eventCalendar_i18n["en-US"] = {
        locale: "en-us",
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        txt_noEvents: "No events for this period",
        txt_SpecificEvents_prev: "Events on",
        txt_SpecificEvents_after: ":",
        txt_next: "next",
        txt_prev: "prev",
        txt_NextEvents: "Next events:",
        txt_GoToEventUrl: "Go to event",
        txt_loading: "Loading...",
        txt_errorLoading: "Error loading events",
        txt_undefinedDate: "Undefined date",
        moment: {
          "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          "weekdays": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "weekdaysShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          "weekdaysMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          "longDateFormat": {
            "LT": "h:mm A",
            "LTS": "h:mm:ss A",
            "L": "MM/DD/YYYY",
            "LL": "MMMM D, YYYY",
            "LLL": "MMMM D, YYYY h:mm A",
            "LLLL": "dddd, MMMM D, YYYY h:mm A"
          },
          "week": {
            "dow": 0,
            // Sunday
            "doy": 6
          }
        }
      };
    }
  });
  require_en_US();
})();
/*!
	jquery.eventCalendar.js
*/
