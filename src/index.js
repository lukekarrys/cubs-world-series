import moment from 'moment-timezone/builds/moment-timezone-with-data'

import './style.css'

const LOCATION = 'America/Detroit'
const DATE = { year: 1908, month: 9, date: 14, hour: 14, minute: 25 }

const then = moment().tz(LOCATION).set(DATE)
const node = document.getElementById('root')

function render () {
  node.textContent = moment().diff(then)
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
