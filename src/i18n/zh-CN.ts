/*!
	jquery.eventCalendar.js
	version: 2.0.3
*/

if (!(window as any).eventCalendar_i18n) {
	(window as any).eventCalendar_i18n = {};
}

(window as any).eventCalendar_i18n['zh-CN'] = <EventCalendar.II18n>{
	locale: "zh-cn",
	monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
	txt_noEvents: "此期间没有事件",
	txt_SpecificEvents_prev: "",
	txt_SpecificEvents_after: "的事件:",
	txt_next: "下个月",
	txt_prev: "上个月",
	txt_NextEvents: "接下来的事件:",
	txt_GoToEventUrl: "前往事件",
	txt_loading: "加载中...",
	txt_errorLoading: "加载事件时出错",
	txt_undefinedDate: "未定义的日期",
	moment: {
		"months": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		"monthsShort": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		"weekdays": ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		"weekdaysShort": ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		"weekdaysMin": ["日", "一", "二", "三", "四", "五", "六"],
		"longDateFormat": {
			"LT": "HH:mm",
			"LTS": "HH:mm:ss",
			"L": "YYYY/MM/DD",
			"LL": "YYYY年M月D日",
			"LLL": "YYYY年M月D日HH:mm",
			"LLLL": "YYYY年M月D日ddddHH:mm"
		},
		"week": {
			"dow": 1,
			"doy": 4
		}
	}
};