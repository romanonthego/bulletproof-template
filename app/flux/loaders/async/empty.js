export const emptyLoader = {
  key: 'empty',

  promise: ({store: {dispatch, getState}}) => {
    return Promise.resolve(null)
  }
}
