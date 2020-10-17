const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

module.exports = {
  mode: 'development',
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
    }),
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed
    }),
  ],
};
