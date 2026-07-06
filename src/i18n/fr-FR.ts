/*!
	jquery.eventCalendar.js
*/

import { II18n } from '../types';

if (!(window as any).eventCalendar_i18n) {
	(window as any).eventCalendar_i18n = {};
}

(window as any).eventCalendar_i18n['fr-FR'] = <II18n>{
	locale: "fr",
	monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
	monthNamesShort: ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
	dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
	dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
	txt_noEvents: "Aucun événement pour cette période",
	txt_SpecificEvents_prev: "Événements du",
	txt_SpecificEvents_after: ":",
	txt_next: "suivant",
	txt_prev: "précédent",
	txt_NextEvents: "Prochains événements :",
	txt_GoToEventUrl: "Aller à l'événement",
	txt_loading: "Chargement...",
	txt_errorLoading: "Erreur lors du chargement des événements",
	txt_undefinedDate: "Date indéterminée",
	moment: {
		"months": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
		"monthsShort": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
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