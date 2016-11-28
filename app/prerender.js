import {renderToString} from 'react-dom/server'
// https://www.youtube.com/watch?v=PnpfGy7q96U
// import {renderToString} from 'react/dist/react.min'
import React from 'react'
import {match, createMemoryHistory} from 'react-router'
import {ReduxAsyncConnect, loadOnServer} from 'redux-connect'
import {Provider} from 'react-redux'
import 'isomorphic-fetch'

import Helmet from 'react-helmet'
import PageMeta from 'app/components/smart/PageMeta'

import routes from 'app/routes'
import createStore from 'app/flux/stores'
import client from 'app/utils/client'
import {TOKEN_COOKIE_NAME} from 'app/flux/constants'

import {setLoginData} from 'app/flux/actions/me'
import template from 'app/template.html'
import NotFoundPage from 'app/components/dumb/pages/Errors/NotFoundPage'
import ServerErrorPage from 'app/components/dumb/pages/Errors/ServerErrorPage'

const renderPage = (html, store, headStrings, statics) => {
  const initialState = JSON.stringify(store.getState())

  return template({
    html,
    initialState,
    statics,
    ...headStrings,
    // passing GLOBALS defined by webpack to template
    // all __NAME__ variables will be accessible where.
    ...GLOBALS,
  })
}


// rendering error page
// trying render smart page with profile etc
// and then pure page with just dumb text
const wrapErrorPage = (ErrorPage, store, statics) => (props = {}) => {
  try {
    return renderPage(renderToString(
      <Provider store={store} key="provider">
        <ErrorPage {...props} />
      </Provider>
    ), store, {}, statics)
  } catch (errorPageRenderingError) { // we need to go deeper!
    return wrapErrorPage(ServerErrorPage, store, statics)({
      error: errorPageRenderingError,
      skipLayout: true, // preventing any `smart` components from rendering. pure html.
    })
  }
}

export default function prerender(req, res, statics) {
  const history = createMemoryHistory(req.url)
  const {store} = createStore(history)

  // trying to set token from cookie `JwtToken`
  const {cookies: {[TOKEN_COOKIE_NAME]: token} = {}} = req

  if (token) {
    store.dispatch(setLoginData({token}))
  }

  // errors pages
  const serverError = wrapErrorPage(ServerErrorPage, store, statics)
  const notFoundPage = wrapErrorPage(NotFoundPage, store, statics)

  // server-side rendering at long last!
  match({routes, location: req.url}, (matchError, redirect, renderProps) => {
    if (matchError) {
      res.status(500).send(serverError({error: matchError}))
    }

    if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    }

    if (renderProps) {
      // 1. load data
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        // 2. use `ReduxAsyncConnect` instead of `RoutingContext` and pass it `renderProps`
        const appHTML = renderToString(
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )

        // head meta-tags
        const head = Helmet.rewind()
        const headStrings = {
          title: head.title.toString(),
          meta: head.meta.toString(),
          link: head.link.toString(),
          script: head.script.toString(),
        }

        // page status
        const pageMeta = PageMeta.rewind()
        const status = pageMeta.status || 200

        // 3. render the Redux initial data into the server markup
        const html = renderPage(appHTML, store, headStrings, statics)

        res.status(status).send(html)
      })
      .catch((loadErr) => {
        res.status(500).send(serverError({error: loadErr}))
      })
    } else {
      res.status(404).send(notFoundPage())
    }
  })
}
