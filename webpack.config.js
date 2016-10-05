'use strict'

const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const CNAMEPlugin = require('./lib/cname-webpack-plugin')
const JSONPlugin = require('./lib/json-webpack-plugin')
const data = require('./lib/data')
const project = require('./package.json')

const root = (parts) => path.join.apply(path, [__dirname].concat(parts || []))
const src = (file) => root(['src', file])
const production = process.env.NODE_ENV === 'production'
const build = 'build'

module.exports = {
  entry: src('index.js'),
  output: {
    path: root(build),
    filename: `app${production ? '.[hash]' : ''}.js`
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /.json$/,
        loader: 'json'
      },
      {
        test: /.pug$/,
        loader: 'pug'
      },
      {
        test: /\.css$/,
        loader: production ? ExtractTextPlugin.extract('style', 'css!postcss') : 'style!css!postcss'
      }
    ]
  },
  postcss: () => [precss, autoprefixer],
  plugins: [
    new HtmlPlugin({
      production,
      title: project.description,
      inject: false,
      favicon: src('favicon.ico'),
      template: src('index.pug'),
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        conservativeCollapse: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        quoteCharacter: "'"
      }
    }),
    new JSONPlugin('api', Object.keys(data).reduce((res, key) => {
      res[key] = data[key]
      res[`${key}_date`] = new Date(data[key])
      return res
    }, {})),
    production && new CleanPlugin([build], { root: root() }),
    production && new CNAMEPlugin(project.homepage),
    production && new ExtractTextPlugin('app.[contenthash].css')
  ].filter(Boolean)
}
