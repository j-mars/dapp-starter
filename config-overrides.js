// eslint-disable-next-line
const { override, addBabelPlugin, addWebpackAlias, fixBabelImports, addLessLoader, useEslintRc  } = require('customize-cra');
const path = require('path');

module.exports = override(
  addBabelPlugin('react-hot-loader/babel'),
  useEslintRc(path.resolve(__dirname, '.eslintrc')),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom',
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#0c0c1b' },
    },
  }),
);
