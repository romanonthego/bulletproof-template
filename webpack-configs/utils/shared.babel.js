/* eslint max-len:0 */
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import StatsPlugin from 'stats-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import dotenv from 'dotenv'
import composeGlobals from './composeGlobals'


// use __DIR instead of __dirname
// will be resolved (or SHOULD be resolved)
// to project root
const __DIR = path.resolve('./')

// loading .env config vars into process.env
dotenv.config({
  path: path.join(__DIR, '.env'),
})

const GLOBALS = {
  DEV: true,
  DEV_PRERENDER: false,
  DEV_ACCESS_TO_COURSES: false,
  NODE_ENV_HEROKU: 'staging',
  //
  HIDE_NEW_COURSES_PAGES: false,
  HIDE_COURSE_6: false,
  //
  OLD_APP: 'vector1-stage.herokuapp.com',
  BASE_URL: 'http://stage.vector.education',
  BASE_HOST: 'stage.vector.education',
  API_BASE: 'https://vector1-stage.herokuapp.com/api',
  //
  FB_ADMINS: null,
  GOOGLE_VERIFICATION: null,
  YANDEX_VERIFICATION: null,
  VK_APP_ID: null,
  FB_APP_ID: null,
  GA: null,
  GA_MODE: 'auto',
  SENTRY_DSN: null,
}

const nodeEnvFromProcess = JSON.stringify(process.env.NODE_ENV || 'development')
const composedGlobals = composeGlobals(GLOBALS)

const globals = {
  __dirname: JSON.stringify(__DIR),
  __filename: JSON.stringify(path.join(__DIR, 'index.js')),
  // special globals. sometimes they exlicitly change the way app behave
  NODE_ENV: nodeEnvFromProcess,
  // react minification hach or something. prevent warning in production console
  'process.env.NODE_ENV': nodeEnvFromProcess,
  ...composedGlobals,
  // to referense globals as object in node.js env
  // for example pass it to template functions without rebinding context
  GLOBALS: composedGlobals,
}

const nodeModulesRegex = /node_modules(?!.+-es6)/

const cssModulesString = 'disableStructuralMinification&modules&localIdentName=[name]-[local]-[hash:base64:5]!postcss!stylus'

const config = {
  output: {
    path: path.join(__DIR, 'build'),
    publicPath: '/assets/',
  },

  root: path.join(__DIR, 'app'),

  extensions: ['', '.js', '.jsx'],

  // loaded configs to use
  loaders: {
    js: {
      test: /\.js|jsx$/,
      loader: 'babel',
      exclude: nodeModulesRegex,
      include: __DIR,
    },
    mustache: {
      test: /.html|mustache|mu$/,
      loader: 'mustache',
    },
    jsHot: {
      test: /\.js|jsx$/,
      loader: 'react-hot!babel',
      exclude: nodeModulesRegex,
      include: __DIR,
    },
    jsHotServer: {
      test: /\.js|jsx$/,
      loader: 'babel',
      exclude: nodeModulesRegex,
      include: __DIR,
    },
    styles: {
      test: /.styl$/,
      loader: `css-loader/locals?${cssModulesString}`,
    },
    stylesHot: {
      test: /.styl$/,
      loader: `style!css?${cssModulesString}`,
    },
    stylesExtraction: {
      test: /.styl$/,
      loader: ExtractTextPlugin.extract('style-loader', `css?${cssModulesString}`)
    },
    json: {
      test: /.json$/,
      loader: 'json',
    },
    svg: {
      test: /\.svg$/,
      loader: 'url?name=[name]@[hash].[ext]',
      query: {
        limit: 10000,
      },
    },
    // eah. inlining woff to prevent fonts flickering
    inlineWoff: {
      test: /\.woff$/,
      loader: 'url?name=[name]@[hash].[ext]&limit=1000000',
    },
    restFiles: {
      test: /\.(otf|ttf)$/,
      loader: 'file?name=[name]@[hash].[ext]',
    },
    uploadcare: {
      test: /\.(jpg|png|gif|mp4|webm|pdf)$/,
      loader: 'uploadcare',
      query: {
        statsFilePath: path.join(__DIR, 'build-cache', 'uploadcare.json'),
        pathAbsolutePart: __DIR,
        publicKey: process.env.UPLOADCARE_PUBLIC_KEY || 'demopublickey',
        privateKey: process.env.UPLOADCARE_PRIVATE_KEY || 'demoprivatekey',
        storeOnUpload: true,
      },
    },
  },

  postLoaders: [
    // react-canvas https://github.com/Flipboard/react-canvas#using-with-webpack
    // {
    //   loader: 'transform?brfs',
    //   exclude: /.(jpg|png|gif|mp4|webm|pdf)/,
    // }
  ],


  plugins: {
    // sourcemaps for node plugin
    sourcemaps: new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false
    }),
    // global variables
    globals: new webpack.DefinePlugin(globals),

    // stats file writing
    stats: new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [
        nodeModulesRegex
      ],
      source: false,
    }),

    // hot
    order: new webpack.optimize.OccurenceOrderPlugin(),
    hot: new webpack.HotModuleReplacementPlugin(),
    noErrors: new webpack.NoErrorsPlugin(),

    // css extraction
    stylesExtractions: new ExtractTextPlugin('[name]@[contenthash].css', {
      allChunks: true
    }),

    // optimization
    deduplication: new webpack.optimize.DedupePlugin(),
    uglify: new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false,
      },
    }),
  },

  stylus: {
    import: [
      path.join(__DIR, 'app', 'styles', 'vars.styl'),
    ],
  },

  postcss: () => [autoprefixer],
}


export const resolve = {
  root: __DIR,
  extensions: ['', '.js', '.jsx'],
}

export default config

export {globals}

export const plugins = [
  config.plugins.globals,
]

// hot replacement plugins
// used together, useless when used separatly
export const hotPlugins = [
  config.plugins.order,
  config.plugins.hot,
  config.plugins.noErrors,
]

export const optimizationPlugins = [
  config.plugins.order,
  config.plugins.deduplication,
  config.plugins.uglify,
  config.plugins.noErrors,
]

// simple loaders with file/url loader - no-hot, no-config - nothing,
export const simpleLoaders = [
  config.loaders.restFiles,
  config.loaders.uploadcare,
  config.loaders.inlineWoff,
  config.loaders.json,
  config.loaders.svg,
  config.loaders.mustache,
]

// external config for stylus/svgo/etc
export const loadersConfigs = {
  stylus: config.stylus,
  postcss: config.postcss,
}

// on server we want to exclude node_modules from build
// to use native require() call to this modules
export function excludeNodeModules() {
  // fuck vertx :)
  const nodeModules = {
    vertx: 'commonjs vertx',
  }

  fs.readdirSync('node_modules')
    .filter((x) => ['.bin'].indexOf(x) === -1)
    .forEach((mod) => {
      nodeModules[`${mod}`] = `commonjs ${mod}`
    })

  return nodeModules
}


export function excludeAnythingButApp() {
  return [
    /^(?!(\.|#|!|app|server|webpack-configs|build|build-cache))/,
  ]
}
