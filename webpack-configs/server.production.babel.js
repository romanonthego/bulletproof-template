import shared, {
  simpleLoaders,
  loadersConfigs,
  excludeAnythingButApp,
  resolve,
} from './utils/shared.babel'

const externals = excludeAnythingButApp()

export default {
  entry: {
    server: './server/production.js',
  },

  target: 'node',

  devtool: 'source-map',

  node: {
    console: true,
  },

  // node modules wont be packed, ther will be required() as should they.
  externals,

  resolve,

  output: {
    path: shared.output.path,
    filename: '[name].js',
    library: 'server',
    libraryTarget: 'commonjs2',
  },

  plugins: [
    shared.plugins.globals,
    shared.plugins.stylesExtractions,
  ],

  module: {
    loaders: [
      shared.loaders.js,
      shared.loaders.stylesExtraction,
      ...simpleLoaders,
    ]
  },

  ...loadersConfigs
}
