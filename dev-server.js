const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const config = require('./webpack.config.js')

const PORT = webpackConfig.devServer.port || 5000

webpackDevServer.addDevServerEntrypoints(config, webpackConfig.devServer)

const compiler = webpack(config)
const server = new webpackDevServer(compiler, webpackConfig.devServer)

server.listen(PORT, 'localhost', () => {
  console.log('Server listening on port %s', PORT)
})
