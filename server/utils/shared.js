/* eslint no-console:0 */
import path from 'path'
import fileSystem from 'fs'
import MemoryFS from 'memory-fs'
import requireFromString from 'require-from-string'
import express from 'express'
import webpack from 'webpack'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'
import get from 'lodash/get'

import configPrerender from '../../webpack-configs/prerender.development.babel'

// server port
export const PORT = +(process.env.PORT || 8080)

export function getStatics() {
  // requiring at runtime is cumbersome :(
  let stats = fileSystem.readFileSync('build/stats.json')

  // do not wrap in try-catch. it should fail if something went wrong.
  stats = JSON.parse(stats)

  return {
    js: get(stats, 'assetsByChunkName.app[0]', 'app.js'),
    css: get(stats, 'assetsByChunkName.app[1]', 'app.css'),
    demoJs: get(stats, 'assetsByChunkName.demo[0]', 'demo.js')
  }
}

// wow this tricky one
// this is basicly manualy constructed webpackDevMiddleware
// that we do is we watch for prerender in separate webpack compiler
// and on compile we construct new node module from string
// and pass it to callback :)
// this way we can have hot reload in server prerender (which is cool)
// and do not break our client hot server with node restarting
export function watchPrerenderCompiler(callbacks = {}) {
  const prerenderCompiler = webpack(configPrerender)

  const fs = new MemoryFS()

  prerenderCompiler.outputFileSystem = fs

  // listening to webpack progress
  if (callbacks.progress) {
    prerenderCompiler.apply(new ProgressPlugin(callbacks.progress))
  }

  prerenderCompiler.watch({}, (err, stats) => {
    if (err) {
      console.log(err.stack)

      callbacks.done(err)
      return
    }
    try {
      const assetsByChunkName = stats.toJson({}).assetsByChunkName
      const prerenderFileName = assetsByChunkName.prerender[0]
      const prerenderFile = path.join(__dirname, 'build', prerenderFileName)

      const content = fs.readFileSync(prerenderFile, 'utf-8')
      const prerender = requireFromString(content)

      console.log('Prerender compiled sucessfully!')

      callbacks.done(null, prerender)
    } catch (e) {
      console.log('Prerender compile error!', e.stack)

      callbacks.done(e, null)
    }
  })
}


// public/assets for production mainly, but public should be mounted in dev
// for favicons and stuff like that (some browsers required it to be served from root url)
// NOTE: try not to place where any images/fonts etc, serve them as assets via webpack
export const publicMiddeware = express.static(path.join('public'))

export const assetsMiddleware = express.static(path.join('build'), {
  maxAge: '365d',
})

export function closingSlashMiddlewara(req, res, next) {
  const asArray = req.url.split('?')
  const beforeQuery = asArray[0]
  const query = asArray[1] ? `?${asArray[1]}` : ''

  if (beforeQuery.substr(-1) === '/') {
    next()
  } else {
    res.redirect(301, `${beforeQuery}/${query}`)
  }
}
