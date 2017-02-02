import 'typeface-oswald'
import './style.css'

import countup from './lib/countup'

const { requestAnimationFrame: raf, data } = window

const LABELS = { d: 'day', h: 'hour', m: 'minute', s: 'second' }
const NODES = Object.keys(LABELS)

const hasValues = (obj) => Object.keys(obj).filter((k) => obj[k]).length === Object.keys(obj).length
const pluralize = (word, count) => `${word}${count === 1 ? '' : 's'}`
const setText = (node, text) => node && (node.textContent = text)

const getNodes = (id) => NODES.reduce((res, name) => {
  res[name] = document.querySelector(`#${id} .${name}`)
  res[`${name}l`] = document.querySelector(`#${id} .${name}l`)
  return res
}, {})

const renderNodes = (nodes, data) => hasValues(nodes) && NODES.forEach((name) => {
  setText(nodes[name], data[name])
  setText(nodes[`${name}l`], pluralize(LABELS[name], data[name]))
})

const wonNodes = getNodes('won')
const playedNodes = getNodes('played')

function render () {
  renderNodes(wonNodes, countup(data.won))
  renderNodes(playedNodes, countup(data.played))
  raf(render)
}

raf(render)
