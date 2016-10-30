import React from 'react'
import Section from './Section'

export default React.createClass({
  propTypes: {
  },

  render() {
    return (
      <Section
        tag="footer"
        backgroundColorKey="darkgray"
        paddedVertical
      >
        Footer!
      </Section>
    )
  }
})
