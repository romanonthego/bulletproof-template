import React from 'react'
import cx from 'classnames'
import css from './Header.styl'
import Section from './Section'

export default React.createClass({
  render() {
    return (
      <Section
        backgroundColorKey="darkgray"
        paddedVertical
      >
        Header
      </Section>
    )
  }
})
