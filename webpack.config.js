const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = require('./index.js')
const env = process.env.NODE_ENV

const webpackConfig = {
  devServer: {
    hot: true,
    port: 5000,
    contentBase: path.resolve(__dirname, 'source'),
    watchContentBase: false,
    historyApiFallback: false,
    host: 'localhost',
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
    extensions: ['.scss', '.js', '.css', '.json'],
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
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}

// Development
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
            sourceMap: true,
            includePaths: config.paths
          }
        }
      ]
    }
  )

  webpackConfig.plugins.push(
    new CleanWebpackPlugin([
      path.resolve(__dirname, '.tmp')
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}

// Production
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
            loader: 'sass-loader',
            options: {
              includePaths: config.paths
            }
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
