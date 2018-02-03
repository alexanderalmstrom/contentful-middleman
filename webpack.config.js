const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const env = process.env.NODE_ENV

const webpackConfig = {
  devServer: {
    port: 5000,
    contentBase: 'build/',
    historyApiFallback: false,
    proxy: {
      '**': {
        target: 'http://localhost:4567'
      }
    }
  },

  entry: [
    './source/javascripts/application.js'
  ],

  resolve: {
    modules: [
      path.resolve(__dirname, 'source/stylesheets'),
      path.resolve(__dirname, 'source/javascripts'),
      path.resolve(__dirname, 'node_modules')
    ]
  },

  output: {
    path: path.resolve(__dirname, '.tmp', 'dist'),
    filename: 'javascripts/application.bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    })
  ]
}

if (env == 'development') {
  webpackConfig.entry.unshift(
    'webpack-hot-middleware/client'
  )

  webpackConfig.module.rules.push(
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }
  )

  webpackConfig.plugins.push(
    new CleanWebpackPlugin([
      path.resolve(__dirname, '.tmp')
    ]),
    new webpack.HotModuleReplacementPlugin()
  )
}

if (env == 'production') {
  webpackConfig.module.rules.push(
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
              options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      })
    }
  )

  webpackConfig.plugins.push(
    new CleanWebpackPlugin([
      path.resolve(__dirname, 'build')
    ]),
    new ExtractTextPlugin('stylesheets/application.bundle.css')
  )
}

module.exports = webpackConfig
