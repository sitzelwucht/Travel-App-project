const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: 'development',
    entry: './src/client/index.js',
    devtool: 'source-map',
    output: {
      libraryTarget: 'var',
      library: 'Client'
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            },
            {
              test: /\.scss$/,
              use: ['style-loader', 'css-loader', 'sass-loader']
           },
           {
              test: /\.(jpe?g|png|gif|ico)$/i,
              loader: 'file-loader'
           },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/html/index.html",
            filename: "./index.html",
            favicon: './src/client/images/globe5.ico'
        })
    ]
}
