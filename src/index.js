import './style.css'
import countup from './lib/countup'
import data from '../lib/data'

const { requestAnimationFrame: raf } = window

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
  renderNodes(wonNodes, countup(data.won))
  renderNodes(playedNodes, countup(data.played))
  raf(render)
}

raf(render)
