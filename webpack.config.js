const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {
  entry: './src/index.ts',
  target:'node',
  externals:[nodeExternals()],
  mode:'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'happypack/loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HappyPack({
      threads:4,
      loaders: [ {
        loader:'ts-loader',
        threadPool: happyThreadPool,
        options:{
          happyPackMode:true
        }
      }]
    })
  ]
};