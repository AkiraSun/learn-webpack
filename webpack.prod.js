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
    // publicPath: '/'//在打包文件下面不能写绝对路径
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
      {
           test: /\.css|scss$/,
           use: ExtractTextPlugin.extract({
               fallback: "style-loader",
               use:[
                     {
                        loader: 'css-loader',
                        options: {
                          minimize: true //css压缩
                        }
                      },
                      {
                        loader: 'postcss-loader'
                      },
                      {
                        loader: 'sass-loader'
                      }
               ]
           })
       },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 8192,//8192以下的压缩变成base64
        name: './img/[hash].[ext]'//不压缩生成图片路径
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
    // new HtmlWebpackPlugin(),
    new ExtractTextPlugin("app.css")
    //自动生产html到dist
  ]
};
