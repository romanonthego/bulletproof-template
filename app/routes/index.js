import React from 'react'
import {Route} from 'react-router'

import Wrap from './Wrap'

import IndexPage from 'app/components/Pages/IndexPage'

import NotFoundPage from 'app/components/Pages/Errors/NotFoundPage'
import ServerErrorPage from 'app/components/Pages/Errors/ServerErrorPage'

export default (
  <Route component={Wrap}>
    <Route path="/" component={IndexPage} />

    <Route path="/404" component={NotFoundPage} />
    <Route path="/500" component={() => <ServerErrorPage error={new Error('Demo error')} />} />

    <Route path="*" component={NotFoundPage} />
  </Route>
)
