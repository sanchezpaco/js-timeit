'use strict';

  function parseTime(timeInMilliseconds){
	const moment = require('moment')
	let duration = moment.duration(timeInMilliseconds, 'milliseconds')
	return {
		years: duration.years(),
		months: duration.months(),
		weeks: duration.weeks(),
		days: duration.days(),
		hours: duration.hours(),
		minutes: duration.minutes(),
		seconds: duration.seconds()
	}
}

module.exports = {parseTime}