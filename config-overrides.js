// eslint-disable-next-line
const { override, addBabelPlugin, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addBabelPlugin('react-hot-loader/babel'),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom',
  }),
);
