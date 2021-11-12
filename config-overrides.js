const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': './src/components',
    '@contexts': './src/contexts',
    '@pages': './src/pages',
    '@router': './src/router',
    '@store': './src/store',
    '@src': './src',
  })(config);

  return config;
};
