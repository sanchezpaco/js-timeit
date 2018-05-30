'use strict';

function parseTime(timeInMilliseconds) {
	let years, months, weeks, days, hours, minutes, seconds;
	years = Math.floor(timeInMilliseconds *  0.000000000031689)
	months = Math.floor(timeInMilliseconds * 0.00000000038027 )
	weeks = Math.floor(timeInMilliseconds * 0.0000000016534)
	seconds = Math.floor(timeInMilliseconds / 1000);
	minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	days = Math.floor(hours / 24);
	hours = hours % 24;
	return { years, months, weeks, days,  hours, minutes, seconds };
  };
module.exports = {parseTime}