import React, {PropTypes, PureComponent} from 'react'
import cx from 'classnames'
import css from './Section.styl'

import ReactDriveIn from 'react-drive-in'
import omit from 'lodash/omit'

const overlayColor = 'rgba(0, 0, 0, 0.3)'

export default class Section extends PureComponent {
  static propTypes = {
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
  }

  static defaultProps = {
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

    const Tag = tag || 'section'

    return (
      <Tag className={classSection} style={sectionStyle} {...props}>
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
      </Tag>
    )
  }
}
