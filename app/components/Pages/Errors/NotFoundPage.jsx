import React, {PropTypes, PureComponent} from 'react'
import {Link} from 'react-router'

import css from './ErrorPages.styl'
import PageMeta from 'app/components/PageMeta'

import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'

export default class NotFoundPage extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <PageMeta status={404}>
        <SiteWrap colorKey="white">
          <Section className={css.section} paddedVertical>
            <section className={css.content}>
              <main>
                <h1 className={css.title}>404</h1>

                <h4>Извините, но такой<br />страницы, к сожалению,<br />не существует</h4>
              </main>
              <aside>
                <Link to="/">
                  Вернуться на главную
                </Link>
              </aside>
            </section>
          </Section>
        </SiteWrap>
      </PageMeta>
    )
  }
}
