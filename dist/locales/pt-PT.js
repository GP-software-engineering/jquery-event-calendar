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

  // src/i18n/pt-PT.ts
  var require_pt_PT = __commonJS({
    "src/i18n/pt-PT.ts"() {
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
  require_pt_PT();
})();
/*!
	jquery.eventCalendar.js
*/
