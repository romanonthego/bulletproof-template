import webpack from 'webpack'
import webpackDevMiddlewareConstructor from 'webpack-dev-middleware'
import webpackHotMiddlewareConstructor from 'webpack-hot-middleware'
import DashboardPlugin from 'webpack-dashboard/plugin'
import configBrowser from '../../webpack-configs/browser.development.babel'

const compiler = webpack(configBrowser)

compiler.apply(new DashboardPlugin())

export const webpackDevMiddleware = webpackDevMiddlewareConstructor(compiler, {
  noInfo: true,
  publicPath: '/assets',
  stats: {
    colors: true
  },
})

export const webpackHotMiddleware = webpackHotMiddlewareConstructor(compiler, {
  log: console.log,
  publicPath: '/assets',
})
