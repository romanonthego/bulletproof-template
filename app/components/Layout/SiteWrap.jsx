import React, {PureComponent} from 'react'
import css from './SiteWrap.styl'
import cx from 'classnames'
import Header from './Header'
import Footer from './Footer'

export default class SiteWrap extends PureComponent{
  static propTypes = {
    children: React.PropTypes.node,
    displayHeader: React.PropTypes.bool,
    displayFooter: React.PropTypes.bool,
    displayProfile: React.PropTypes.bool,
    colorKey: React.PropTypes.string,
    skipIntro: React.PropTypes.bool,
  }

  static defaultProps = {
    displayHeader: true,
    displayFooter: true,
    displayProfile: true,
    skipIntro: false,
  }

  render() {
    const {
      children,
      displayHeader,
      displayProfile,
      displayFooter,
      colorKey,
      skipIntro,
    } = this.props

    const cl = cx({
      [css.site]: true,
      [css.paddedTop]: skipIntro,
    })

    return (
      <div className={cl}>
        {displayHeader &&
          <Header colorKey={colorKey} displayProfile={displayProfile} />
        }

        <main className={css.siteWrap}>
          {children}
        </main>

        {displayFooter &&
          <Footer />
        }
      </div>
    )
  }
}
