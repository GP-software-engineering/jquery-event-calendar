/*!
	jquery.eventCalendar.js
*/

import { II18n } from '../types';

if (!(window as any).eventCalendar_i18n) {
	(window as any).eventCalendar_i18n = {};
}

(window as any).eventCalendar_i18n['it-IT'] = <II18n>{
	locale: "it",
	monthNames: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
	monthNamesShort: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
	dayNames: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
	dayNamesShort: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
	txt_noEvents: "Nessun evento in questo periodo",
	txt_SpecificEvents_prev: "",            // text before the long date of a specific day
	txt_SpecificEvents_after: "- eventi:",  // text after the long date of a specific day
	txt_next: "seguente",
	txt_prev: "precedente",
	txt_NextEvents: "Prossimi eventi:",
	txt_GoToEventUrl: "Vai all'evento",
	txt_loading: "attendere...",
	txt_errorLoading: "Errore durante il caricamento degli eventi",
	txt_undefinedDate: "data non definita",
	moment: {
		"months": ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
		"monthsShort": ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
		"weekdays": ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
		"weekdaysShort": ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
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

