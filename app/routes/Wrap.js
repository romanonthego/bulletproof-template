import React, {PropTypes, PureComponent} from 'react'
import {connect} from 'react-redux'

import PageMeta from 'app/components/PageMeta'
// import Helmet from 'app/components/Helmet'
import Helmet from 'bulletproof-helmet-es6'
import {asyncConnect} from 'redux-connect'

import {emptyLoader} from 'app/flux/loaders/async/empty'
import RouteTransition from './RouteTransition'
import LoadingBar from 'app/components/Layout/LoadingBar.connector'
import omit from 'lodash/omit'

class Wrap extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const {
      location: {
        pathname,
      },
    } = this.props

    const props = omit(this.props, [
      'history',
      'location',
      'params',
      'route',
      'router',
      'empty',
      'routeParams',
      'routes',
      'dispatch',
    ])

    return (
      <PageMeta status={200}>
        <main>
          <Helmet
            title="test"
            description="testDescription"
            image="image.png"
            website={{
              url: 'blah',
              name: 'blah!',
              searchUrl: 'http://e.com/search?q',
            }}
          />
          <LoadingBar />

          <RouteTransition animated pathname={pathname}>
            <main {...props} />
          </RouteTransition>
        </main>
      </PageMeta>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

const WrapConnected = connect(mapStateToProps, mapDispatchToProps)(Wrap)

export default asyncConnect([
  emptyLoader,
])(WrapConnected)
