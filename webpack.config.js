var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  //source-map定位问题
  devtool: 'eval-source-map',
  entry:  {
    index:'./main.jsx'
  },
  output: {
    path: path.resolve(__dirname+'/dist'),
    filename: '[name].js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
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
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录,index一定要手动拉到根目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    port:3303
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new HtmlWebpackPlugin()//把html文件插入dist
  ]
};
