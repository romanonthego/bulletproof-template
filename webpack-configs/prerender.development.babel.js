import shared, {
  simpleLoaders,
  hotPlugins,
  loadersConfigs,
  resolve,
  excludeNodeModules,
} from './utils/shared.babel'

const externals = excludeNodeModules()

export default {
  entry: {
    prerender: [
      './app/prerender.js',
    ]
  },

  target: 'node',

  devtool: 'source-maps',

  node: {
    console: true,
  },

  // node modules wont be packed, ther will be required() as should they.
  externals,

  resolve,

  output: {
    path: shared.output.path,
    filename: '[name].js',
    library: 'prerender',
    libraryTarget: 'commonjs2',
  },

  plugins: [
    shared.plugins.globals,
    shared.plugins.sourcemaps,
    shared.plugins.globals,
    ...hotPlugins,
  ],

  module: {
    loaders: [
      shared.loaders.jsHotServer,
      shared.loaders.styles,
      ...simpleLoaders,
    ]
  },

  ...loadersConfigs
}
