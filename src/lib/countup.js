const MS = 1000
const S = 60
const M = 60
const H = 24
const BASE = MS * S * M * H

export default (date, now) => {
  const val = date._d || date

  if (typeof val !== 'string') return

  const input = (now || Date.now()) - (new Date(date._d || date)).valueOf()

  const days = input / BASE
  const d = Math.floor(days)

  const hours = (days - d) * H
  const h = Math.floor(hours)

  const minutes = (hours - h) * M
  const m = Math.floor(minutes)

  const seconds = (minutes - m) * S
  const s = Math.floor(seconds)

  const milliseconds = (seconds - s) * MS
  const ms = Math.floor(milliseconds)

  return {
    d,
    h,
    m,
    s,
    ms
  }
}
