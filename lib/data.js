const moment = require('moment-timezone')
const _ = require('lodash')

const won = moment.tz('2016-11-03T00:48:00', 'America/Detroit')
const location = 'Cleveland, OH'

const data = {
  won,
  won_location: location,
  played: won,
  played_location: location
}

module.exports.api = _.transform(data, (res, value, key) => {
  res[key] = value.valueOf()
  if (moment.isMoment(value)) {
    res[`${key}_date`] = value.clone().utc()
  }
})

module.exports.template = _.transform(data, (res, value, key) => {
  if (moment.isMoment(value)) {
    res[key] = {
      d: value,
      date: value.format('MMMM D, YYYY'),
      time: value.format('h:mma')
    }
  } else {
    res[key] = value
  }
})
