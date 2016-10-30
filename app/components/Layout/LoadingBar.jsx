import React, {PropTypes} from 'react'
import {TransitionMotion, spring} from 'react-motion'
import css from './LoadingBar.styl'

export default React.createClass({
  propTypes: {
    loading: PropTypes.number,
  },

  getDefaultProps() {
    return {
      loading: 0,
    }
  },

  getInitialState() {
    return {

    }
  },

  getStyles() {
    if (!this.props.loading) {
      return []
    }

    return [
      {
        key: 'loading-bar',
        style: {
          width: spring(80, {stiffness: 146, damping: 32, precision: 1})
        }
      }
    ]
  },

  willEnter() {
    return {
      width: 0
    }
  },

  willLeave() {
    return {
      width: spring(120, {stiffness: 146, damping: 32, precision: 1})
    }
  },

  render() {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {interpolatedStyles =>
          <div className={css.bar}>
            {interpolatedStyles.map(({key, style}) => {
              return <div key={key} style={{width: `${style.width}%`}}/>
            })}
          </div>
        }
      </TransitionMotion>
    )
  }
})
