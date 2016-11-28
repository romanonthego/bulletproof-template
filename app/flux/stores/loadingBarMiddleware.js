import {showLoading, hideLoading} from 'react-redux-loading-bar'
import {BEGIN_GLOBAL_LOAD, END_GLOBAL_LOAD} from 'app/flux/constants'

export default ({dispatch}) => next => action => {
  next(action)

  if (action.type === undefined) {
    return
  }

  if (action.type === BEGIN_GLOBAL_LOAD) {
    dispatch(showLoading())
  } else if (action.type === END_GLOBAL_LOAD) {
    dispatch(hideLoading())
  }
}
