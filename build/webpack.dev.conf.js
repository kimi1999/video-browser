var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 多个 入口文件 从webpack.base.conf.js 里面提出来写在这里
baseWebpackConfig.entry = {
    app: './src/app.js',
    video_list: './src/video_list.js',
    video_detail: './src/video_detail.js'
}
baseWebpackConfig.output = {
  path: config.build.assetsRoot,
  publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
  filename: '[name].js'
}




// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'pages/index.html',
      chunks: ["app"],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'video_list.html',
      template: 'pages/video_list.html',
      chunks: ["video_list"],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'video_detail.html',
      template: 'pages/video_detail.html',
      chunks: ["video_detail"],
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
