import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {routerReducer, syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-connect'
import {loadingBarReducer} from 'react-redux-loading-bar'
import thunk from 'redux-thunk'
import window from 'app/utils/window'
import reducers from 'app/flux/reducers'
import loadingBarMiddleware from './loadingBarMiddleware'

// https://github.com/zalmoxisus/redux-devtools-extension#implementation
// external redux devtools via chrome extention
// or just null function
const devToolsExtension = window.devToolsExtension ? window.devToolsExtension() : (f) => f

export default function create(history, initialState = {}) {
  const reducer = combineReducers({
    ...reducers,
    reduxAsyncConnect,
    routing: routerReducer,
    loadingBar: loadingBarReducer,
  })

  const reduxRouterMiddleware = routerMiddleware(history)

  const finalCreateStore = compose(
    applyMiddleware(
      reduxRouterMiddleware,
      thunk,
      loadingBarMiddleware
    ),
    devToolsExtension
  )(createStore)

  const store = finalCreateStore(reducer, initialState)

  const syncHistory = syncHistoryWithStore(history, store)

  return {
    store,
    history: syncHistory,
  }
}
