'use strict'

module.exports = class CNAMEPlugin {
  constructor (val) {
    // No protocol in CNAME
    this.val = val.split('://')[1] || val
  }

  apply (compiler) {
    compiler.plugin('emit', (compilation, cb) => {
      compilation.assets.CNAME = {
        source: () => this.val,
        size: () => this.val.length
      }
      cb()
    })
  }
}
