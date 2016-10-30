/* eslint no-console:0 */
import express from 'express'
// import basicAuth from 'basic-auth-connect'
import expressWebSocket from 'express-ws'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import noPrerenderTemplate from './utils/noPrerenderTemplate.html'
import nullPrerender from '../app/prerender.null'

import {
  PORT,
  publicMiddeware,
  watchPrerenderCompiler,
} from './utils/shared'

import {
  webpackDevMiddleware,
  webpackHotMiddleware,
} from './utils/webpackMiddlewares'

import demoMiddleware from './utils/demoMiddleware'

const statics = {
  js: 'app.js',
  demoJs: 'demo.js',
}

const app = express()

// better logger for development
app.use(morgan('dev'))

let prerender = null

if (__DEV_PRERENDER__) {

  // attaching websocket to express server
  const appWs = expressWebSocket(app)

  app.ws('/prerender-status', (ws, req) => {
    ws.on('message', (msg) => {
      ws.send(msg || 'hello')
    })
  })

  watchPrerenderCompiler({
    progress: (percentage, msg) => {
      appWs.getWss()
        .clients
        .map((client) => {
          return client.send(JSON.stringify({percentage, msg}))
        })
    },
    done: (err, compiledPrerender) => {
      if (err) {
        prerender = null
      } else {
        prerender = compiledPrerender
      }
    }
  })
} else {
  prerender = nullPrerender
}

app.use(cookieParser())

app.use('/', publicMiddeware)

app.use(webpackDevMiddleware)
app.use(webpackHotMiddleware)

app.use('/__demo', demoMiddleware(statics))

app.use('/', (req, res) => {
  if (prerender) {
    prerender(req, res, statics)
  } else {
    res.send(noPrerenderTemplate({timeout: 3}))
  }
})

app.listen(PORT, () => {
  console.log(`App development server listening on ${PORT} with NODE_ENV=${process.env.NODE_ENV}`)
})
