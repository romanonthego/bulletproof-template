/* eslint-disable no-var, vars-on-top, no-console, no-inner-declarations, no-use-before-define */
var unstoreAllFiles = null
var path = require('path')

try {
  unstoreAllFiles = require('uploadcare-loader/dist/unstore-all-files')
} catch (e) {
  console.log('No unstore-all-files script avaliable. try install uploadcare-loader@1.0.2 and up')
  process.exit(0)
}

var isFunction = require('lodash/isFunction')
var publicKey = process.env.UPLOADCARE_PUBLIC_KEY
var privateKey = process.env.UPLOADCARE_PRIVATE_KEY
var deletedStatsFile = path.join(__dirname, '..', '/build-cache/uploadcare-deleted.json')

if (isFunction(unstoreAllFiles) && publicKey && publicKey.length && publicKey !== 'demopublickey') {
  unstoreAllFiles(publicKey, privateKey, deletedStatsFile)
} else {
  console.log('Nothing to unstore, UPLOADCARE_PUBLIC_KEY=', publicKey)
}
