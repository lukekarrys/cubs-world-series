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

module.exports.json = class JSONPlugin extends FilePlugin {
  constructor (filename, val) {
    super(`${filename}.json`, JSON.stringify(val))
  }
}
