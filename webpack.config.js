'use strict'

const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const {cname: CNAMEPlugin, json: JSONPlugin} = require('./lib/file-plugin')
const data = require('./lib/data')
const project = require('./package.json')

const root = (parts) => path.join.apply(path, [__dirname].concat(parts || []))
const src = (file) => root(['src', file])
const production = process.env.NODE_ENV === 'production'
const build = 'build'

const postcss = {
  loader: 'postcss-loader',
  options: { plugins: () => [require('precss'), require('autoprefixer')] }
}

const productionPlugins = []
if (production) {
  productionPlugins.push(...[
    new CleanPlugin([build], { root: root() }),
    new CNAMEPlugin(project.homepage),
    new ExtractTextPlugin('app.[contenthash].css')
  ])
}

module.exports = {
  entry: src('index.js'),
  output: {
    path: root(build),
    filename: `app${production ? '.[hash]' : ''}.js`
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.css$/,
        use: production
          ? ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: ['css-loader', postcss]
          })
          : ['style-loader', 'css-loader', postcss]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      production,
      data: data.template,
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
    new JSONPlugin('api', data.api),
    ...productionPlugins
  ]
}
