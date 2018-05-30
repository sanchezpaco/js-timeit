'use strict'

const millisHaveASecond = 1000
const secondsHaveAMinute = 60
const minutesHaveAnHour = 60
const hoursHaveADay = 24
const daysHaveAWeek = 7
const weeksHaveAMonth = 4.34524
const monthsHaveAYear = 12

function parseTime (timeInMilliseconds) {
  let timePassed = {
    years:   0,
    months:  0,
    weeks:   0,
    days:    0,
    hours:   0,
    minutes: 0,
    seconds: 0,
  }

	let totalTime = timeInMilliseconds / millisHaveASecond
	totalTime = totalTime / secondsHaveAMinute
  totalTime, timePassed = getTimeInUnits(totalTime)

  console.log(timePassed)
	timePassed = getRawTimePassed(totalTime, timePassed)
	timePassed = balanceTime(timePassed)

	return timePassed
}

function getTimeInUnits(totalTime) {

	let timeInUnits = {}

	timeInUnits.seconds = calculateRawTime(totalTime, secondsHaveAMinute)
	totalTime, timeInUnits.minutes = calculateInUnits(totalTime, minutesHaveAnHour)
	totalTime, timeInUnits.hours = calculateInUnits(totalTime, hoursHaveADay)
	totalTime, timeInUnits.days = calculateInUnits(totalTime, daysHaveAWeek)
	totalTime, timeInUnits.weeks = calculateInUnits(totalTime, weeksHaveAMonth)
	totalTime, timeInUnits.months = calculateInUnits(totalTime, monthsHaveAYear)

	return totalTime, timeInUnits
}

function getRawTimePassed(totalTime, timeInUnits) {
	let rawTimePassed = {}

	rawTimePassed.years = Math.floor(totalTime)
	rawTimePassed.months = timeInUnits.months + calculateRawTime(totalTime, monthsHaveAYear)
	rawTimePassed.weeks = timeInUnits.weeks + calculateRawTime(rawTimePassed.months, weeksHaveAMonth)
	rawTimePassed.days = timeInUnits.days + calculateRawTime(rawTimePassed.weeks, daysHaveAWeek)
	rawTimePassed.hours = timeInUnits.hours + calculateRawTime(rawTimePassed.days, hoursHaveADay)
	rawTimePassed.minutes = timeInUnits.minutes + calculateRawTime(rawTimePassed.hours, minutesHaveAnHour)
	rawTimePassed.seconds = timeInUnits.seconds + calculateRawTime(rawTimePassed.minutes, secondsHaveAMinute)

	return rawTimePassed
}

function balanceTime(rawTimePassed) {

	let balancedTime = {}

	let realSeconds = getRealDate(rawTimePassed.seconds, secondsHaveAMinute)
	balancedTime.seconds = realSeconds["time"]

	let realMinutes = getRealDate(rawTimePassed.minutes+realSeconds["timeToAddToNext"], minutesHaveAnHour)
	balancedTime.minutes = realMinutes["time"]

	let realHours = getRealDate(rawTimePassed.hours+realMinutes["timeToAddToNext"], hoursHaveADay)
	balancedTime.hours = realHours["time"]

	let realDays = getRealDate(rawTimePassed.days+realHours["timeToAddToNext"], daysHaveAWeek)
	balancedTime.days = realDays["time"]

	let realWeeks = getRealDate(rawTimePassed.weeks+realDays["timeToAddToNext"], weeksHaveAMonth)
	balancedTime.weeks = realWeeks["time"]

	let realMonths = getRealDate(rawTimePassed.months+realWeeks["timeToAddToNext"], monthsHaveAYear)
	balancedTime.months = realMonths["time"]

	balancedTime.years = rawTimePassed.years + realMonths["timeToAddToNext"]

	return balancedTime
}

function calculateInUnits(time, units) {
	time = Math.floor(time)
	time = time / units
	let totalInUnits = calculateRawTime(time, units)

	return time, totalInUnits
}

function getRealDate(time, divisor) {
	let realDate ={}

	let realTime = time / divisor
	let timeToAddToNext = 0.

	if (realTime >= 1) {
		timeToAddToNext = Math.floor(realTime)
		realTime = calculateRawTime(realTime, divisor)
	} else {
		realTime = time
	}

	realDate["time"] = Math.floor(realTime)
	realDate["timeToAddToNext"] = timeToAddToNext

	return realDate
}

function calculateRawTime(x, y) {
	let totalTimeRound = Math.floor(x)
  console.log(x, totalTimeRound)
	return (x - totalTimeRound) * y
}

module.exports = {
  parseTime
}
