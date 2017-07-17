var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry:  {
    index:'./main.jsx',
    vendor: ['react']
  },
  output: {
    path: path.resolve(__dirname+'/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
              presets: ['es2015','react']
          }
      },
      //css压缩必须分开写
      {
         test: /\.css$/,
         use: ExtractTextPlugin.extract({
             fallback: "style-loader",
             use:[
                 {
                     loader: 'css-loader',
                     options:{
                         minimize: true //css压缩
                     }
                 }
             ]
         })
     },
     {
         test: /\.scss$/,
         use: ExtractTextPlugin.extract({
             fallback: 'style-loader',
             use: ['css-loader', 'sass-loader']
         })
     },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 100000
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
