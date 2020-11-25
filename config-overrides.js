const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@': './src',
  })(config)
  config.devtool = 'cheap-source-map'
  
  return config
}