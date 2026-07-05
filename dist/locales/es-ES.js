"use strict";
/*!
    jquery.eventCalendar.js
    version: 2.0.3
    author:
        Gianpiero Caretti (@gpcaretti)
    company:
        GP software engineering
    url:
        https://www.gpsoftware.it
*/
if (!window.eventCalendar_i18n) {
    window.eventCalendar_i18n = {};
}
window.eventCalendar_i18n['es-ES'] = {
    locale: "es",
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Julio", "Ago", "Sep", "Oct", "Nov", "Dic"],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    txt_noEvents: "No hay eventos para este periodo",
    txt_SpecificEvents_prev: "",
    txt_SpecificEvents_after: "eventos:",
    txt_next: "siguiente",
    txt_prev: "anterior",
    txt_NextEvents: "Próximos eventos:",
    txt_GoToEventUrl: "Ir al evento",
    txt_loading: "un momento por favor...",
    txt_errorLoading: "Error al cargar los eventos",
    txt_undefinedDate: "fecha no determinata",
    moment: {
        "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        "monthsShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Julio", "Ago", "Sep", "Oct", "Nov", "Dic"],
        "weekdays": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"],
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
