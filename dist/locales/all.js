"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/i18n/en-US.ts
  var require_en_US = __commonJS({
    "src/i18n/en-US.ts"() {
      "use strict";
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

  // src/i18n/it-IT.ts
  var require_it_IT = __commonJS({
    "src/i18n/it-IT.ts"() {
      "use strict";
      if (!window.eventCalendar_i18n) {
        window.eventCalendar_i18n = {};
      }
      window.eventCalendar_i18n["it-IT"] = {
        locale: "it",
        monthNames: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
        monthNamesShort: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
        dayNames: ["domenica", "luned\xEC", "marted\xEC", "mercoled\xEC", "gioved\xEC", "venerd\xEC", "sabato"],
        dayNamesShort: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
        txt_noEvents: "Nessun evento in questo periodo",
        txt_SpecificEvents_prev: "",
        // text before the long date of a specific day
        txt_SpecificEvents_after: "- eventi:",
        // text after the long date of a specific day
        txt_next: "seguente",
        txt_prev: "precedente",
        txt_NextEvents: "Prossimi eventi:",
        txt_GoToEventUrl: "Vai all'evento",
        txt_loading: "attendere...",
        txt_errorLoading: "Errore durante il caricamento degli eventi",
        txt_undefinedDate: "data non definita",
        moment: {
          "months": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
          "monthsShort": ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
          "weekdays": ["domenica", "luned\xEC", "marted\xEC", "mercoled\xEC", "gioved\xEC", "venerd\xEC", "sabato"],
          "weekdaysShort": ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
          "weekdaysMin": ["do", "lu", "ma", "me", "gi", "ve", "sa"],
          "longDateFormat": {
            "LT": "H:mm",
            "LTS": "LT:ss",
            "L": "DD/MM/YYYY",
            "LL": "D MMMM YYYY",
            "LLL": "D [di] MMMM [del] YYYY LT",
            "LLLL": "dddd, D [di] MMMM [del] YYYY LT"
          },
          "week": {
            "dow": 1,
            "doy": 4
          }
        }
        //.format('L')      // 06/09/2014
        //.format('l')      // 6/9/2014
        //.format('LL')     // June 9 2014
        //.format('ll')     // Jun 9 2014
        //.format('LLL')    // June 9 2014 9:32 PM
        //.format('lll')    // Jun 9 2014 9:32 PM
        //.format('LLLL')   // Monday, June 9 2014 9:32 PM
        //.format('llll')   // Mon, Jun 9 2014 9:32 PM
      };
    }
  });

  // src/i18n/es-ES.ts
  var require_es_ES = __commonJS({
    "src/i18n/es-ES.ts"() {
      "use strict";
      if (!window.eventCalendar_i18n) {
        window.eventCalendar_i18n = {};
      }
      window.eventCalendar_i18n["es-ES"] = {
        locale: "es",
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Julio", "Ago", "Sep", "Oct", "Nov", "Dic"],
        dayNames: ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "Sabado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        txt_noEvents: "No hay eventos para este periodo",
        txt_SpecificEvents_prev: "",
        txt_SpecificEvents_after: "eventos:",
        txt_next: "siguiente",
        txt_prev: "anterior",
        txt_NextEvents: "Pr\xF3ximos eventos:",
        txt_GoToEventUrl: "Ir al evento",
        txt_loading: "un momento por favor...",
        txt_errorLoading: "Error al cargar los eventos",
        txt_undefinedDate: "fecha no determinata",
        moment: {
          "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
          "monthsShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Julio", "Ago", "Sep", "Oct", "Nov", "Dic"],
          "weekdays": ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "Sabado"],
          "weekdaysShort": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
          "weekdaysMin": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
          "longDateFormat": {
            "LT": "H:mm",
            "LTS": "LT:ss",
            "L": "DD/MM/YYYY",
            "LL": "D [de] MMMM [de] YYYY",
            "LLL": "D [de] MMMM [de] YYYY LT",
            "LLLL": "dddd, D [de] MMMM [de] YYYY LT"
          },
          "week": {
            "dow": 1,
            "doy": 4
          }
        }
      };
    }
  });

  // src/i18n/fr-FR.ts
  var require_fr_FR = __commonJS({
    "src/i18n/fr-FR.ts"() {
      "use strict";
      if (!window.eventCalendar_i18n) {
        window.eventCalendar_i18n = {};
      }
      window.eventCalendar_i18n["fr-FR"] = {
        locale: "fr",
        monthNames: ["Janvier", "F\xE9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xFBt", "Septembre", "Octobre", "Novembre", "D\xE9cembre"],
        monthNamesShort: ["Janv.", "F\xE9vr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Ao\xFBt", "Sept.", "Oct.", "Nov.", "D\xE9c."],
        dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
        txt_noEvents: "Aucun \xE9v\xE9nement pour cette p\xE9riode",
        txt_SpecificEvents_prev: "\xC9v\xE9nements du",
        txt_SpecificEvents_after: ":",
        txt_next: "suivant",
        txt_prev: "pr\xE9c\xE9dent",
        txt_NextEvents: "Prochains \xE9v\xE9nements :",
        txt_GoToEventUrl: "Aller \xE0 l'\xE9v\xE9nement",
        txt_loading: "Chargement...",
        txt_errorLoading: "Erreur lors du chargement des \xE9v\xE9nements",
        txt_undefinedDate: "Date ind\xE9termin\xE9e",
        moment: {
          "months": ["janvier", "f\xE9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt", "septembre", "octobre", "novembre", "d\xE9cembre"],
          "monthsShort": ["janv.", "f\xE9vr.", "mars", "avr.", "mai", "juin", "juil.", "ao\xFBt", "sept.", "oct.", "nov.", "d\xE9c."],
          "weekdays": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
          "weekdaysShort": ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
          "weekdaysMin": ["di", "lu", "ma", "me", "je", "ve", "sa"],
          "longDateFormat": {
            "LT": "HH:mm",
            "LTS": "HH:mm:ss",
            "L": "DD/MM/YYYY",
            "LL": "D MMMM YYYY",
            "LLL": "D MMMM YYYY HH:mm",
            "LLLL": "dddd D MMMM YYYY HH:mm"
          },
          "week": {
            "dow": 1,
            "doy": 4
          }
        }
      };
    }
  });

  // src/i18n/de-DE.ts
  var require_de_DE = __commonJS({
    "src/i18n/de-DE.ts"() {
      "use strict";
      if (!window.eventCalendar_i18n) {
        window.eventCalendar_i18n = {};
      }
      window.eventCalendar_i18n["de-DE"] = {
        locale: "de",
        monthNames: ["Januar", "Februar", "M\xE4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthNamesShort: ["Jan.", "Feb.", "Mrz.", "Apr.", "Mai", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."],
        dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
        dayNamesShort: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
        txt_noEvents: "Keine Ereignisse in diesem Zeitraum",
        txt_SpecificEvents_prev: "Ereignisse am",
        txt_SpecificEvents_after: ":",
        txt_next: "weiter",
        txt_prev: "zur\xFCck",
        txt_NextEvents: "N\xE4chste Ereignisse:",
        txt_GoToEventUrl: "Zum Ereignis",
        txt_loading: "Wird geladen...",
        txt_errorLoading: "Fehler beim Laden der Ereignisse",
        txt_undefinedDate: "Undefiniertes Datum",
        moment: {
          "months": ["Januar", "Februar", "M\xE4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
          "monthsShort": ["Jan.", "Feb.", "Mrz.", "Apr.", "Mai", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."],
          "weekdays": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
          "weekdaysShort": ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
          "weekdaysMin": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
          "longDateFormat": {
            "LT": "HH:mm",
            "LTS": "HH:mm:ss",
            "L": "DD.MM.YYYY",
            "LL": "D. MMMM YYYY",
            "LLL": "D. MMMM YYYY HH:mm",
            "LLLL": "dddd, D. MMMM YYYY HH:mm"
          },
          "week": {
            "dow": 1,
            "doy": 4
          }
        }
      };
    }
  });

  // src/i18n/pt-PT.ts
  var require_pt_PT = __commonJS({
    "src/i18n/pt-PT.ts"() {
      "use strict";
      if (!window.eventCalendar_i18n) {
        window.eventCalendar_i18n = {};
      }
      window.eventCalendar_i18n["pt-PT"] = {
        locale: "pt",
        monthNames: ["Janeiro", "Fevereiro", "Mar\xE7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        dayNames: ["Domingo", "Segunda-feira", "Ter\xE7a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S\xE1bado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"],
        txt_noEvents: "Nenhum evento neste per\xEDodo",
        txt_SpecificEvents_prev: "Eventos em",
        txt_SpecificEvents_after: ":",
        txt_next: "seguinte",
        txt_prev: "anterior",
        txt_NextEvents: "Pr\xF3ximos eventos:",
        txt_GoToEventUrl: "Ir para o evento",
        txt_loading: "A carregar...",
        txt_errorLoading: "Erro ao carregar os eventos",
        txt_undefinedDate: "Data indefinida",
        moment: {
          "months": ["janeiro", "fevereiro", "mar\xE7o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
          "monthsShort": ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
          "weekdays": ["domingo", "segunda-feira", "ter\xE7a-feira", "quarta-feira", "quinta-feira", "sexta-feira", "s\xE1bado"],
          "weekdaysShort": ["dom", "seg", "ter", "qua", "qui", "sex", "s\xE1b"],
          "weekdaysMin": ["do", "2\xAA", "3\xAA", "4\xAA", "5\xAA", "6\xAA", "sa"],
          "longDateFormat": {
            "LT": "HH:mm",
            "LTS": "HH:mm:ss",
            "L": "DD/MM/YYYY",
            "LL": "D [de] MMMM [de] YYYY",
            "LLL": "D [de] MMMM [de] YYYY HH:mm",
            "LLLL": "dddd, D [de] MMMM [de] YYYY HH:mm"
          },
          "week": {
            "dow": 1,
            "doy": 4
          }
        }
      };
    }
  });

  // src/i18n/zh-CN.ts
  var require_zh_CN = __commonJS({
    "src/i18n/zh-CN.ts"() {
      "use strict";
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

  // src/i18n/all.ts
  var require_all = __commonJS({
    "src/i18n/all.ts"() {
      var import_en_US = __toESM(require_en_US());
      var import_it_IT = __toESM(require_it_IT());
      var import_es_ES = __toESM(require_es_ES());
      var import_fr_FR = __toESM(require_fr_FR());
      var import_de_DE = __toESM(require_de_DE());
      var import_pt_PT = __toESM(require_pt_PT());
      var import_zh_CN = __toESM(require_zh_CN());
    }
  });
  require_all();
})();
/*!
	jquery.eventCalendar.js
*/
