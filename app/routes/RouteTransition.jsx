import React from 'react'
import {TransitionMotion, spring} from 'react-motion'
import css from './RouteTransition.styl'
import cx from 'classnames'
// import reactVendorPrefixes from 'app/utils/reactVendorPrefixes'

export default React.createClass({
  propTypes: {
    pathname: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    animated: React.PropTypes.bool,
    animationConfig: React.PropTypes.shape({
      stiffness: React.PropTypes.number.isRequired,
      damping: React.PropTypes.number.isRequired,
      precision: React.PropTypes.number
    }),
  },

  getDefaultProps() {
    return {
      animated: true,
      animationConfig: {stiffness: 146, damping: 32, precision: 0.01},
    }
  },


  getStyles() {
    const {
      children,
      pathname
    } = this.props

    return [
      {
        key: pathname,
        data: {children},
        style: {
          opacity: 1,
        }
      }
    ]
  },

  willEnter() {
    return {
      opacity: 1,
    }
  },


  willLeave() {
    return {
      opacity: spring(0, this.props.animationConfig),
    }
  },


  renderAnimatedMotion() {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {interpolatedStyles =>
          <div className={css.wrap}>
            {interpolatedStyles.map(({key, data, style}) => {
              const {opacity} = style

              // animated out
              const animated = opacity < 1

              const cl = cx({
                [css.animated]: animated
              })

              const transitionStyle = {
                opacity,
              }

              return (
                <div key={key} className={cl} style={transitionStyle}>
                  {data.children}
                </div>
              )
            }
            )}
          </div>
        }
      </TransitionMotion>
    )
  },

  renderWithoutAnimation() {
    return (
      this.props.children
    )
  },

  render() {
    if (this.props.animated) {
      return this.renderAnimatedMotion()
    }

    return this.renderWithoutAnimation()
  },
})
