const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')

const project = require('./package.json')

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
        loader: production ? ExtractTextPlugin.extract('style', 'css') : ['style', 'css']
      }
    ]
  },
  plugins: [
    new CleanPlugin(['build'], {
      root: __dirname
    }),
    new HtmlPlugin({
      title: project.description,
      inject: false,
      template: path.join(__dirname, 'src', 'index.pug')
    }),
    new ExtractTextPlugin('style.[contenthash].css')
  ]
}
