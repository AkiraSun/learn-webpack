var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry:  {
    index:'./main.jsx'
  },
  output: {
    path: path.resolve(__dirname+'/dist'),
    filename: '[name].js'
  },
  module: {
    loaders:[
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
            test: /\.(png|jpg)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name:'img/[name].[hash:7].[ext]'
            }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("app.css"),
    //自动生产html到dist
    new HtmlWebpackPlugin()
  ]
};
