import './style.css'
import countup from './lib/countup'

const { requestAnimationFrame: raf } = window

const LAST_WON = -1931744069967
const LAST_PLAYED = -764476103235
const LABELS = { d: 'day', h: 'hour', m: 'minute', s: 'second' }
const NODES = Object.keys(LABELS)

const pluralize = (word, count) => `${word}${count === 1 ? '' : 's'}`

const getNodes = (id) => NODES.reduce((res, name) => {
  res[name] = document.querySelector(`#${id} .${name}`)
  res[`${name}l`] = document.querySelector(`#${id} .${name}l`)
  return res
}, {})

const wonNodes = getNodes('won')
const playedNodes = getNodes('played')

const renderNodes = (nodes, data) => NODES.forEach((name) => {
  nodes[name].textContent = data[name]
  nodes[`${name}l`].textContent = `${pluralize(LABELS[name], data[name])}`
})

function render () {
  renderNodes(wonNodes, countup(LAST_WON))
  renderNodes(playedNodes, countup(LAST_PLAYED))
  raf(render)
}

raf(render)
