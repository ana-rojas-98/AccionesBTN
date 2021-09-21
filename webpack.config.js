const webpack = require('webpack')

const path = require('path');

module.exports = {
 
  resolve: {
    fallback: {
      "util": require.resolve("util"),
      "crypto-browserify": require.resolve('path-browserify'),
      "buffer": require.resolve("buffer/"),
      "os": require.resolve("os-browserify/browser"),
      "assert": require.resolve("assert/"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"), 
      "zlib": require.resolve("browserify-zlib"), 
      "stream": require.resolve("stream-browserify"), 
      "https": require.resolve("https-browserify"), 
      "url": require.resolve("url/"), 
      "http": require.resolve("stream-http"), 
      "vm": require.resolve("vm-browserify"), 
      "constants": require.resolve("constants-browserify"), 
      "fs": false,
      "child_process": false,
      "worker_threads": false,
      "inspector": false
    
      //if you want to use this module also don't forget npm i crypto-browserify 
    }
   },
   
   module: {
    rules: [
      { 
        test: /\.(js)$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
        
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }, 
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: /images/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      },
    ]
   },
   entry: './app/game/index.js',
   output: {
    filename: 'main.js',
    path: __dirname + "/src/main/resources/static"
   },

    plugins: [  
      new webpack.DefinePlugin({
        'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG)
      })
    ]
  }