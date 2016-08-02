const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const project = require('./package.json')

const noop = () => {}
const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: `bundle${production ? '.[hash]' : ''}.js`
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
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
        loader: production ? ExtractTextPlugin.extract('style', 'css', 'postcss') : 'style!css!postcss'
      }
    ]
  },
  postcss: () => [precss, autoprefixer],
  plugins: [
    new HtmlPlugin({
      title: project.description,
      inject: false,
      favicon: path.join(__dirname, 'src', 'favicon.ico'),
      template: path.join(__dirname, 'src', 'index.pug')
    }),
    production ? new CleanPlugin(['build'], { root: __dirname }) : noop,
    production ? new ExtractTextPlugin('style.[contenthash].css') : noop
  ]
}
