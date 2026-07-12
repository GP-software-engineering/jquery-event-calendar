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

  // src/i18n/zh-CN.ts
  var require_zh_CN = __commonJS({
    "src/i18n/zh-CN.ts"() {
      if (!window.eventCalendar_i18n) {
        window.eventCalendar_i18n = {};
      }
      window.eventCalendar_i18n["zh-CN"] = {
        locale: "zh-cn",
        monthNames: ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
        monthNamesShort: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
        dayNames: ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"],
        dayNamesShort: ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"],
        txt_noEvents: "\u6B64\u671F\u95F4\u6CA1\u6709\u4E8B\u4EF6",
        txt_SpecificEvents_prev: "",
        txt_SpecificEvents_after: "\u7684\u4E8B\u4EF6:",
        txt_next: "\u4E0B\u4E2A\u6708",
        txt_prev: "\u4E0A\u4E2A\u6708",
        txt_NextEvents: "\u63A5\u4E0B\u6765\u7684\u4E8B\u4EF6:",
        txt_GoToEventUrl: "\u524D\u5F80\u4E8B\u4EF6",
        txt_loading: "\u52A0\u8F7D\u4E2D...",
        txt_errorLoading: "\u52A0\u8F7D\u4E8B\u4EF6\u65F6\u51FA\u9519",
        txt_undefinedDate: "\u672A\u5B9A\u4E49\u7684\u65E5\u671F",
        moment: {
          "months": ["\u4E00\u6708", "\u4E8C\u6708", "\u4E09\u6708", "\u56DB\u6708", "\u4E94\u6708", "\u516D\u6708", "\u4E03\u6708", "\u516B\u6708", "\u4E5D\u6708", "\u5341\u6708", "\u5341\u4E00\u6708", "\u5341\u4E8C\u6708"],
          "monthsShort": ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
          "weekdays": ["\u661F\u671F\u65E5", "\u661F\u671F\u4E00", "\u661F\u671F\u4E8C", "\u661F\u671F\u4E09", "\u661F\u671F\u56DB", "\u661F\u671F\u4E94", "\u661F\u671F\u516D"],
          "weekdaysShort": ["\u5468\u65E5", "\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D"],
          "weekdaysMin": ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
          "longDateFormat": {
            "LT": "HH:mm",
            "LTS": "HH:mm:ss",
            "L": "YYYY/MM/DD",
            "LL": "YYYY\u5E74M\u6708D\u65E5",
            "LLL": "YYYY\u5E74M\u6708D\u65E5HH:mm",
            "LLLL": "YYYY\u5E74M\u6708D\u65E5ddddHH:mm"
          },
          "week": {
            "dow": 1,
            "doy": 4
          }
        }
      };
    }
  });
  require_zh_CN();
})();
/*!
	jquery.eventCalendar.js
*/
