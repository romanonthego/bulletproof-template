/* eslint-disable no-console */

import window from 'app/utils/window'
const Raven = window.Raven

;['setUserContext', 'captureMessage', 'captureException'].forEach(name => {
  module.exports[name] = function(e, ...args) {
    if (__PRERENDER__) {
      return
    }
    if (name === 'captureMessage' || name === 'captureException') {
      console.error('RAVEN:', name, ...args)
      console.error(e.stack)
    }
    if (Raven) {
      Raven[name](...args)
    }
  }
})


module.exports.watchUser = function(reduxStore, idSelector) {
  if (__PRERENDER__) {
    return
  }

  // set initial `lastId` to an unique object,
  // so `id !== lastId` will be guaranteed `false`
  let lastId = {}

  function onChange() {
    const id = idSelector(reduxStore.getState())
    if (id !== lastId) {
      lastId = id
      module.exports.setUserContext({id})
    }
  }

  onChange()
  reduxStore.subscribe(onChange)
}
