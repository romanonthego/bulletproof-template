import {types} from 'app/flux/actions/count'
import buildReducer from 'app/utils/flux/buildReducer'

const initialState = {
  count: 0,
}

export default buildReducer(initialState, {
  [types.INCREASE]: (state, payload) => {
    return {
      count: state.count + payload.amount,
    }
  },

  [types.DECREASE]: (state, payload) => {
    return {
      count: state.count - payload.amount,
    }
  },
})

