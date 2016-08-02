import './style.css'

import countup from './lib/countup'

const LAST_WON = -1931744069967
const LAST_PLAYED = -764476103235

const $ = (s) => document.querySelector(s)

const wonNodes = {
  days: $('#won .days'),
  hours: $('#won .hours'),
  minutes: $('#won .minutes'),
  seconds: $('#won .seconds')
}

const playedNodes = {
  days: $('#played .days'),
  hours: $('#played .hours'),
  minutes: $('#played .minutes'),
  seconds: $('#played .seconds')
}

const renderNodes = (nodes, data) => Object.keys(nodes).forEach((node) => {
  nodes[node].textContent = data[node]
})

function render () {
  renderNodes(wonNodes, countup(LAST_WON))
  renderNodes(playedNodes, countup(LAST_PLAYED))
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
