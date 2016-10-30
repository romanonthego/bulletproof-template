/*
 * This is an enhanced version of
 * https://github.com/gaearon/react-document-title
 */

import React, {PropTypes as T, Children} from 'react'
import withSideEffect from 'react-side-effect'
import mergeAll from 'ramda/src/mergeAll'

const PageMeta = React.createClass({

  displayName: 'PageMeta',

  propTypes: {
    children: T.node,
  },

  render() {
    if (this.props.children) {
      return Children.only(this.props.children)
    }
    return null
  },

})

function reducePropsToState(propsList) {
  const result = mergeAll(propsList)
  result.title = propsList
    .map(x => x.title)
    .filter(x => x)
    .reverse()
    .join(' | ')
  return result
}

function handleStateChangeOnClient(result) {
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(PageMeta)
