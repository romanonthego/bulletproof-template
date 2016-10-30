import React from 'react'
import SiteWrap from 'app/components/Layout/SiteWrap'
import Section from 'app/components/Layout/Section'

export default React.createClass({
  propTypes: {
    isBetaTester: React.PropTypes.bool,
  },

  render() {
    return (
      <SiteWrap colorKey="white">
        <Section>
          Index
        </Section>
      </SiteWrap>
    )
  }
})
