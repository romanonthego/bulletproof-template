import React from 'react'

import css from './ErrorPages.styl'
import PageMeta from 'app/components/PageMeta'

import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'
import window from 'app/utils/window'

export default React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    error: React.PropTypes.object,
    skipLayout: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      skipLayout: false,
    }
  },


  render() {
    const {
      error,
      skipLayout,
    } = this.props

    const displayError = error &&
      (NODE_ENV === 'development' || __NODE_ENV_HEROKU__ === 'staging')

    return (
      <PageMeta status={500}>
        <SiteWrap colorKey="white" displayHeader={!skipLayout} displayFooter={!skipLayout}>
          <Section className={css.section} paddedVertical>

            {displayError &&
              <code className={css.errorStack}>
                Message: {error.message}
                <br/>
                <br/>
                {error.stack}
              </code>
            }

            <section className={css.content}>
              <main>
                <h1 className={css.title}>Ошибка</h1>

                <h4>Извините, но<br/>в какой-то момент,<br/> что-то пошло не так</h4>
              </main>
              <aside>
                <button onClick={() => window.location.reload()}>
                  Обновить страницу
                </button>
              </aside>
            </section>
          </Section>
        </SiteWrap>
      </PageMeta>
    )
  }
})
