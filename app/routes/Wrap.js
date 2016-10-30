import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import PageMeta from 'app/components/PageMeta'
import Helmet from 'app/components/Helmet'
import {asyncConnect} from 'redux-connect'

import {emptyLoader} from 'app/flux/loaders/async/empty'
import RouteTransition from './RouteTransition'
import LoadingBar from 'app/components/Layout/LoadingBar.connector'
import omit from 'lodash/omit'

const Wrap = React.createClass({
  propTypes: {

    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired
  },

  render() {
    const {
      location: {
        pathname,
      }
    } = this.props

    const props = omit(this.props, [
      'history',
      'location',
      'params',
      'route',
      'routeParams',
      'routes',
      'dispatch',
      'setPartnersCookie'
    ])

    return (
      <PageMeta status={200}>
        <main>
          <Helmet />
          <LoadingBar />

          <RouteTransition animated pathname={pathname}>
            <main {...props} />
          </RouteTransition>
        </main>
      </PageMeta>
    )
  }
})

const mapStateToProps = () => {}

const mapDispatchToProps = () => {}

const WrapConnected = connect(mapStateToProps, mapDispatchToProps)(Wrap)

export default asyncConnect([
  emptyLoader,
])(WrapConnected)
