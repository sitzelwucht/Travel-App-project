const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
})
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports ={
  mode: 'production',
  entry: './src/client/index.js',
  devtool: 'source-map',
  output: {
    libraryTarget: 'var',
    library: 'Client',
    path: path.resolve(__dirname, 'html'),
    filename: "index.js",
  },
    module: {
        rules: [
          {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            include: path.resolve(__dirname, "src"),
            use: {
              loader: "babel-loader"
            }
          },
            {
               test: /\.scss$/,
               use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW(),
        new webpack.DefinePlugin({
          "process.env": dotenv.parsed
        }),
    ],
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
}
