import React, {PropTypes, PureComponent} from 'react'
import {TransitionMotion, spring} from 'react-motion'
import css from './LoadingBar.styl'

const springConfig = {stiffness: 146, damping: 32, precision: 1}

export default class LoadingBar extends PureComponent {
  static propTypes = {
    loading: PropTypes.number,
  }

  static defaultProps = {
    loading: 0,
  }

  getStyles = () => {
    if (!this.props.loading) {
      return []
    }

    return [
      {
        key: 'loading-bar',
        style: {
          width: spring(80, springConfig),
        },
      },
    ]
  }

  willEnter = () => ({width: 0})

  willLeave = () => ({width: spring(120, springConfig)})

  render() {
    return (
      <TransitionMotion
        styles={this.getStyles()}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {interpolatedStyles =>
          <div className={css.bar}>
            {interpolatedStyles.map(({key, style: {width}}) =>
              <div key={key} style={{width: `${width}%`}} />
            )}
          </div>
        }
      </TransitionMotion>
    )
  }
}
