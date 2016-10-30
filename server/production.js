/* eslint no-console:0 */
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import prerender from 'app/prerender'
import cookieParser from 'cookie-parser'

import {
  PORT,
  getStatics,
  assetsMiddleware,
  publicMiddeware,
  proxyMiddleware,
} from './utils/shared'

import {
  sentryRequestMiddleware,
  sentryErrorMiddleware
} from './utils/sentryMiddlewares'

const app = express()

const statics = getStatics()

// security middleware
// https://github.com/helmetjs/helmet - read more
app.use(helmet())

app.use(cookieParser())

// gzip all the things
app.use(compression())

app.use('/', publicMiddeware)
app.use('/assets', assetsMiddleware)

app.use(sentryRequestMiddleware)

app.use('/', (req, res) => {
  prerender(req, res, statics)
})

app.use(sentryErrorMiddleware)

app.listen(PORT, () => {
  console.log(`App production server listening on ${PORT} with NODE_ENV=${process.env.NODE_ENV}`)
})
