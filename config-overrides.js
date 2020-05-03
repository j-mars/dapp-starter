// eslint-disable-next-line
const { override, addBabelPlugin, addWebpackAlias, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  addBabelPlugin('react-hot-loader/babel'),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom',
  }),
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#25b864' },
    },
  }),
);
