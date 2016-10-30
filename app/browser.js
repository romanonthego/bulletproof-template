import 'babel-polyfill'
import 'isomorphic-fetch'
import 'app/styles/entry.styl'

import ReactDOM from 'react-dom'
import React from 'react'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {ReduxAsyncConnect} from 'redux-connect'
import createStore from 'app/flux/stores'
import routes from 'app/routes'

import {trackPage} from 'app/utils/gaAction'
// import scrollToElement from 'app/utils/scrollToElement'

const {
  store,
  history
} = createStore(browserHistory, window.__INITIAL_STATE__)

const app = (
  <Provider store={store} key="provider">
    <Router history={history} render={(props) => <ReduxAsyncConnect {...props} />} >
      {routes}
    </Router>
  </Provider>
)

history.listen(({pathname, action}) => {
  trackPage(pathname)

  // scrolling to the top on navigation
  // only on PUSH (histroy api .push() method) events
  if (action === 'PUSH') {
    // TODO: check FF for animation
    // const body = window.document.querySelectorAll('body')[0]
    // scrollToElement(body, {position: 'top'})

    // for now just reset scroll
    window.scrollTo(0, 0)
  }
})

ReactDOM.render(app, document.getElementById('app'))
