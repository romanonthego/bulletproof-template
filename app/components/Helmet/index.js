import React from 'react'
import Helmet from 'react-helmet'
import mapKeys from 'lodash/mapKeys'

// Smart Helment who knows about metatags and can fall back to sensible defaults
// TODO:
// * ability to override social-network-specific tags (need to have better images);
// * discard from hardcoded defaults to some sort of config via variables
// * fix itemprop for schemaOrg because Helmet guys forgot about it...
// * implement link also with icons, colors and stuff

const facebookImage = require('./assets/facebook.png')
const twitterImage = require('./assets/twitter.png')

export default React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    image: React.PropTypes.string,
    url: React.PropTypes.string,
    twitter: React.PropTypes.shape({
      title: React.PropTypes.string,
      description: React.PropTypes.string,
      image: React.PropTypes.string,
    }),

    facebook: React.PropTypes.shape({
      title: React.PropTypes.string,
      description: React.PropTypes.string,
      image: React.PropTypes.string,
    }),
    schemas: React.PropTypes.array,
    phoneNumber: React.PropTypes.string,
  },

  // covers 99% use cases
  getDefaultProps() {
    return {
      title: 'Vector',
      description: 'Курсы о том, как создавать городские проекты.',
      image: '',
      url: `${__BASE_URL__}/`,
      twitter: {},
      facebook: {},
      // phoneNumber: '+37256450265',
      schemas: [],
    }
  },


  // facebook and other providers with openGraph readers
  // (vk, other social networks)
  openGraph: {
    title: '',
    description: '',
    image: `${facebookImage}`,
    'image:width': '1200',
    'image:height': '630',
    type: 'article',
    url: '',
    site_name: 'Vector',
  },

  // loved by Google
  // does not work by now :(
  schemaOrg: {
    name: '',
    description: '',
    image: '',
  },

  // Twitter card summary
  // it's actually awesome and we SHOULD use it
  // look up here https://dev.twitter.com/cards/types/summary-large-image
  twitter: {
    card: 'summary_large_image',
    title: '',
    description: '',
    image: `${twitterImage}`,
    site: '@Vectorbystrelka',
    creator: '@Vectorbystrelka',
  },

  fb: {
    admins: `${__FB_ADMINS__}`,
    app_id: `${__FB_APP_ID__}`,
  },

  buildMeta() {
    const meta = [
      {name: 'description', content: this.props.description},
      {name: 'msapplication-TileColor', content: '#2E42A4'},
      {name: 'msapplication-TileImage', content: `${__BASE_URL__}/favicons/mstile-144x144.png`},
      {name: 'theme-color', content: '#ffffff'},
      ...(__GOOGLE_VERIFICATION__ ? {name: 'google-site-verification', content: `${__GOOGLE_VERIFICATION__}`} : {}),
      ...(__YANDEX_VERIFICATION__ ? {name: 'yandex-verification', content: `${__YANDEX_VERIFICATION__}`} : {}),
    ]

    mapKeys(this.openGraph, (value, key) => {
      meta.unshift({
        property: `og:${key}`,
        content: this.props.facebook[key] || this.props[key] || this.openGraph[key]
      })
    })

    mapKeys(this.schemaOrg, (value, key) => {
      meta.unshift({
        itemprop: key,
        content: this.schemaOrg[key] || this.props[key]
      })
    })

    mapKeys(this.twitter, (value, key) => {
      meta.unshift({
        name: `twitter:${key}`,
        content: this.props.twitter[key] || this.props[key] || this.twitter[key]
      })
    })

    return meta
  },

  buildScript() {
    return [
      {
        name: 'company',
        type: 'application/ld+json',
        innerHTML: this.companySchema()
      },
      {
        name: 'website',
        type: 'application/ld+json',
        innerHTML: this.websiteSchema()

      },

      ...this.props.schemas,
    ]
  },

  companySchema() {
    const logo = require('./assets/logo.png')

    return `
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        "name": "Vector",
        "url": "${__BASE_URL__}",
        "logo": "${logo}",
        "sameAs" : [
          "https://twitter.com/vectorbystrelka",
          "https://vk.com/vectorbystrelka",
          "https://www.facebook.com/vectorbystrelka",
          "https://instagram.com/vectorbystrelka"
        ]
      }
    `
  },

  websiteSchema() {
    return `
      {
        "@context" : "http://schema.org",
        "@type" : "WebSite",
        "name" : "Vector",
        "alternateName" : "Vectorbystrelka",
        "url" : "${__BASE_URL__}"
      }
    `
  },

  buildLink() {
    return [
      {rel: 'apple-touch-icon', sizes: '57x57', href: `${__BASE_URL__}/favicons/apple-touch-icon-57x57.png`},
      {rel: 'apple-touch-icon', sizes: '60x60', href: `${__BASE_URL__}/favicons/apple-touch-icon-60x60.png`},
      {rel: 'apple-touch-icon', sizes: '72x72', href: `${__BASE_URL__}/favicons/apple-touch-icon-72x72.png`},
      {rel: 'apple-touch-icon', sizes: '76x76', href: `${__BASE_URL__}/favicons/apple-touch-icon-76x76.png`},
      {rel: 'apple-touch-icon', sizes: '114x114', href: `${__BASE_URL__}/favicons/apple-touch-icon-114x114.png`},
      {rel: 'apple-touch-icon', sizes: '120x120', href: `${__BASE_URL__}/favicons/apple-touch-icon-120x120.png`},
      {rel: 'apple-touch-icon', sizes: '144x144', href: `${__BASE_URL__}/favicons/apple-touch-icon-144x144.png`},
      {rel: 'apple-touch-icon', sizes: '152x152', href: `${__BASE_URL__}/favicons/apple-touch-icon-152x152.png`},
      {rel: 'apple-touch-icon', sizes: '180x180', href: `${__BASE_URL__}/favicons/apple-touch-icon-180x180.png`},
      {rel: 'icon', type: 'image/png', href: `${__BASE_URL__}/favicons/favicon-32x32.png`, sizes: '32x32'},
      {rel: 'icon', type: 'image/png', href: `${__BASE_URL__}/favicons/android-chrome-192x192.png`, sizes: '192x192'},
      {rel: 'icon', type: 'image/png', href: `${__BASE_URL__}/favicons/favicon-96x96.png`, sizes: '96x96'},
      {rel: 'icon', type: 'image/png', href: `${__BASE_URL__}/favicons/favicon-16x16.png`, sizes: '16x16'},
      {rel: 'manifest', href: `${__BASE_URL__}/favicons/manifest.json`},
    ]
  },


  render() {
    return (
      <Helmet
        title={this.props.title}
        meta={this.buildMeta()}
        link={this.buildLink()}
        script={this.buildScript()}
      />
    )
  }
})
