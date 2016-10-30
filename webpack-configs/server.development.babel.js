import shared, {
  simpleLoaders,
  loadersConfigs,
  excludeNodeModules,
  resolve,
} from './utils/shared.babel'

const externals = excludeNodeModules()

export default {
  entry: {
    server: './server/development.js',
  },

  target: 'node',

  devtool: 'eval',

  node: {
    console: true,
  },

  // node modules wont be packed, ther will be required() as should they.
  externals,

  resolve,

  output: {
    path: shared.output.path,
    filename: '[name].js',
  },

  plugins: [
    shared.plugins.sourcemaps,
    shared.plugins.globals,
  ],

  module: {
    loaders: [
      shared.loaders.js,
      shared.loaders.styles,
      ...simpleLoaders,
    ]
  },

  ...loadersConfigs
}
