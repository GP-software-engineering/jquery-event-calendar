/*!
	jquery.eventCalendar.js
*/

import { II18n } from '../types';

if (!(window as any).eventCalendar_i18n) {
	(window as any).eventCalendar_i18n = {};
}

(window as any).eventCalendar_i18n['pt-PT'] = <II18n>{
	locale: "pt",
	monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
	monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
	dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
	dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
	txt_noEvents: "Nenhum evento neste período",
	txt_SpecificEvents_prev: "Eventos em",
	txt_SpecificEvents_after: ":",
	txt_next: "seguinte",
	txt_prev: "anterior",
	txt_NextEvents: "Próximos eventos:",
	txt_GoToEventUrl: "Ir para o evento",
	txt_loading: "A carregar...",
	txt_errorLoading: "Erro ao carregar os eventos",
	txt_undefinedDate: "Data indefinida",
	moment: {
		"months": ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
		"monthsShort": ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
		"weekdays": ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
		"weekdaysShort": ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
		"weekdaysMin": ["do", "2ª", "3ª", "4ª", "5ª", "6ª", "sa"],
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