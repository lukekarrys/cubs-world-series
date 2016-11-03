const moment = require('moment-timezone')

const won = moment.tz('2016-11-03T00:36:00', 'America/Detroit')
const location = 'Cleveland, OH'

module.exports = {
  won,
  won_location: location,
  played: won,
  played_location: location
}
