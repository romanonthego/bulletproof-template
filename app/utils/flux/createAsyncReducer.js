import {LOAD, LOAD_SUCCESS, LOAD_FAIL, CLEAR} from './constants'

export default function createAsyncReducer(key) {

  const initialState = {
    loading: false,
    loaded: false,
  }

  return function update(state = initialState, action) {
    if (action.key !== key) {
      return state
    }

    switch (action.type) {
      case LOAD:
        return {
          loading: true,
          loaded: false,
        }
      case LOAD_SUCCESS:
        return {
          loading: false,
          loaded: true,
          data: action.data
        }
      case LOAD_FAIL:
        return {
          loading: false,
          loaded: false,
          error: action.err
        }
      case CLEAR:
        return {
          loading: false,
          loaded: false,
        }
      default:
        return state
    }
  }
}
