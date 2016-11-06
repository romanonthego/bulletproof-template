import {PropTypes, Children, PureComponent} from 'react'
import withSideEffect from 'react-side-effect'
import mergeAll from 'ramda/src/mergeAll'

class PageMeta extends PureComponent {
  static displayName = 'PageMeta'

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const {children} = this.props
    if (children) {
      return Children.only(children)
    }

    return null
  }
}

function reducePropsToState(propsList) {
  const result = mergeAll(propsList)
  return result
}

function handleStateChangeOnClient() {
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(PageMeta)
