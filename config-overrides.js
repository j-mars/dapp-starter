// eslint-disable-next-line
const { override, addBabelPlugin, addWebpackAlias,  useEslintRc } = require('customize-cra');

module.exports = override(
  useEslintRc(),
  addBabelPlugin('react-hot-loader/babel'),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom',
  }),
);
