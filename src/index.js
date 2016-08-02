import './style.css'

const VALUE = -1931744069967

const $ = (s) => document.getElementById(s)

const readable = (date) => {
  const input = Date.now() - (new Date(date)).valueOf()

  const days = input / (1000 * 60 * 60 * 24)
  const d = Math.floor(days)

  const hours = (days - d) * 24
  const h = Math.floor(hours)

  const minutes = (hours - h) * 60
  const m = Math.floor(minutes)

  const seconds = (minutes - m) * 60
  const s = Math.floor(seconds)

  const milliseconds = (seconds - s) * 1000
  const ms = Math.floor(milliseconds)

  return {
    d,
    h,
    m,
    s,
    ms
  }
}

const days = $('days')
const hours = $('hours')
const minutes = $('minutes')
const seconds = $('seconds')

function render () {
  const d = readable(VALUE)
  days.textContent = d.d
  hours.textContent = d.h
  minutes.textContent = d.m
  seconds.textContent = `${d.s}`
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
