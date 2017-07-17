var path = require('path');
var webpack = require('webpack');
//js压缩插件
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//html模版导出插件plugins声明
var HtmlWebpackPlugin = require('html-webpack-plugin');
//抽离css插件 必须在
var ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
  //source-map定位问题
  devtool: 'eval-source-map',
  //单入口也可以写成多入口
  entry:  {
    index:'./main.jsx',
    //单独引用vendor，在html中也要引用对应的js
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
    //webpack1写法
    // loaders:[
    //   { test: /\.css$/, loader: 'style-loader!css-loader' },
    //   {
    //         test: /\.(png|jpg)$/,
    //         loader: 'url-loader',
    //         query: {
    //             limit: 10000,
    //             name:'img/[name].[hash:7].[ext]'
    //         }
    //   },
    //   {
    //     test: /\.jsx$/,
    //     exclude: /node_modules/,
    //     loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
    //     query: {
    //       presets: ['es2015','react']
    //     }
    //   }
    // ]
  },
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录,index一定要手动拉到根目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    port:3303
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new HtmlWebpackPlugin(),//把html文件插入dist
    new ExtractTextPlugin("[name].css")//css文件也可以合并到一个文件中
  ]
};
