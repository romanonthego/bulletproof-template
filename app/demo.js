import ReactDOM from 'react-dom'
import React from 'react'
import {Provider} from 'react-redux'
import Library from 'react-demo-library'
import createStore from 'app/demo/createStore'
import demos from 'app/utils/demoPaths'

import 'app/styles/entry.styl'
import 'isomorphic-fetch'

const store = createStore()

const demo = (
  <Provider store={store} key="provider">
    <Library demos={demos} />
  </Provider>
)

ReactDOM.render(demo, document.getElementById('demo'))
