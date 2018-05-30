'use strict'

const timeIt = require('../lib/timeit')
const expect = require('chai').expect

describe('TimeIt module', () => {
  describe('#parseTime', () => {
    it('should calculate the passed time', () => {

      let timeInMilliseconds = 600000

      let expectedTime = {
        years:   0,
        months:  0,
        weeks:   0,
        days:    0,
        hours:   0,
        minutes: 10,
        seconds: 0,
      }

      let result = timeIt.parseTime(timeInMilliseconds)

      expect(result).to.deep.equal(expectedTime)
    })

    it('should calculate the passed time', () => {

      let timeInMilliseconds = 6000000

      let expectedTime = {
        years:   0,
        months:  0,
        weeks:   0,
        days:    0,
        hours:   1,
        minutes: 40,
        seconds: 0,
      }

      let result = timeIt.parseTime(timeInMilliseconds)

      expect(result).to.deep.equal(expectedTime)
    })
  })
})