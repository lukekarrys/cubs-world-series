'use strict'

module.exports = class JSONPlugin {
  constructor (filename, val) {
    this.filename = filename
    this.val = JSON.stringify(val)
  }

  apply (compiler) {
    compiler.plugin('emit', (compilation, cb) => {
      compilation.assets[`${this.filename}.json`] = {
        source: () => this.val,
        size: () => this.val.length
      }
      cb()
    })
  }
}
