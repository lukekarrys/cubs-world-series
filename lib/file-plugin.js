'use strict'

class FilePlugin {
  constructor (filename, val) {
    this.filename = filename
    this.val = val
  }

  apply (compiler) {
    compiler.plugin('emit', (compilation, cb) => {
      compilation.assets[this.filename] = {
        source: () => this.val,
        size: () => this.val.length
      }
      cb()
    })
  }
}

module.exports.cname = class CNAMEPlugin extends FilePlugin {
  constructor (val) {
    // No protocol in CNAME
    super('CNAME', val.split('://')[1] || val)
  }
}

module.exports.json = class JSONPlugin extends FilePlugin {
  constructor (filename, val) {
    super(`${filename}.json`, JSON.stringify(val))
  }
}
