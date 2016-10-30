import React, {PropTypes} from 'react'
import cx from 'classnames'
import css from './Section.styl'

import InlineSVG from 'svg-inline-react'
import ReactDriveIn from 'react-drive-in'
import omit from 'lodash/omit'

const overlayColor = 'rgba(0, 0, 0, 0.3)'

export default React.createClass({
  propTypes: {
    tag: PropTypes.string,
    className: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundVideo: PropTypes.arrayOf(PropTypes.string),
    showOverlay: PropTypes.bool,
    showVideoOverlay: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.node,
    paddedTop: PropTypes.bool,
    marginTop: PropTypes.bool,
    paddedBottom: PropTypes.bool,
    marginBottom: PropTypes.bool,
    paddedVertical: PropTypes.bool,
    paddedVerticalBig: PropTypes.bool,
    backgroundColorKey: PropTypes.string,
  },

  getDefaultProps() {
    return {
      tag: 'section',
      showOverlay: true,
      showVideoOverlay: true,
      titlePosition: 'left',
      paddedVertical: false,
      paddedVerticalBig: false,
      paddedTop: false,
      marginTop: false,
      paddedBottom: true,
      marginBottom: false,
      backgroundColorKey: 'white'
    }
  },


  renderHeader() {
    const {
      title,
      titlePosition,
      hint,
    } = this.props

    const headerClass = cx({
      [css.headerInner]: true,
      [css.left]: titlePosition === 'left',
      [css.center]: titlePosition === 'center',
    })

    return (
      <header className={css.header}>
        <div className={headerClass}>
          <h6 className={css.title}>
            {title}
          </h6>
        </div>
      </header>
    )
  },


  render() {
    const {
      children,
      style,
      className,
      paddedTop,
      marginTop,
      paddedVertical,
      paddedVerticalBig,
      paddedBottom,
      marginBottom,
      backgroundColorKey,
      backgroundImage,
      backgroundVideo,
      showOverlay,
      showVideoOverlay,
      title,
      tag,
      ...otherProps
    } = this.props

    const classSection = cx({
      [className]: className && className.length,
      [css.section]: true,
      [css.paddedTop]: paddedTop || paddedVertical,
      [css.marginTop]: marginTop,
      [css.paddedBottom]: paddedBottom || paddedVertical,
      [css.marginBottom]: marginBottom,
      [css.paddedVerticalBig]: paddedVerticalBig,
      [css[backgroundColorKey]]: backgroundColorKey,
    })

    const classMain = cx({
      [css.main]: true
    })

    const sectionStyle = {
      ...style
    }

    if (backgroundImage && backgroundImage.length) {
      let overlay = ''

      if (showOverlay) {
        overlay = `linear-gradient(${overlayColor}, ${overlayColor}),`
      }

      sectionStyle.backgroundImage = `${overlay} url(${backgroundImage})`
    }

    const props = omit(otherProps, ['titlePosition'])

    return (
      <this.props.tag className={classSection} style={sectionStyle} {...props}>
        {backgroundVideo && backgroundVideo.length &&
          <ReactDriveIn
            className={(cx({[css.driveInOverlay]: showVideoOverlay}))}
            poster={backgroundImage}
            show={backgroundVideo}
          />
        }

        <main className={classMain}>
          {children}
        </main>
      </this.props.tag>
    )
  }
})
