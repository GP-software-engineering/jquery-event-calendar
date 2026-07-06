/*!
	jquery.eventCalendar.js
*/

import { II18n } from '../types';

if (!(window as any).eventCalendar_i18n) {
	(window as any).eventCalendar_i18n = {};
}

(window as any).eventCalendar_i18n['de-DE'] = <II18n>{
	locale: "de",
	monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	monthNamesShort: ["Jan.", "Feb.", "Mrz.", "Apr.", "Mai", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."],
	dayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	dayNamesShort: ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."],
	txt_noEvents: "Keine Ereignisse in diesem Zeitraum",
	txt_SpecificEvents_prev: "Ereignisse am",
	txt_SpecificEvents_after: ":",
	txt_next: "weiter",
	txt_prev: "zurück",
	txt_NextEvents: "Nächste Ereignisse:",
	txt_GoToEventUrl: "Zum Ereignis",
	txt_loading: "Wird geladen...",
	txt_errorLoading: "Fehler beim Laden der Ereignisse",
	txt_undefinedDate: "Undefiniertes Datum",
	moment: {
		"months": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
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