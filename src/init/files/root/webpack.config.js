const webpack = require('webpack');
const PKG = require('./package.json');
const BUILD_DATE = new Date();

const MANIFEST = JSON.stringify({
  name: `${PKG.name}`,
  version: `${PKG.version}`,
  buildDate: `${BUILD_DATE.toISOString()}`
}, null, 2);

const defineManifest = (config) => {
  config.plugins.push(
    new webpack.DefinePlugin({'APP_MANIFEST': MANIFEST})
  );
};

module.exports = (config) => {
  defineManifest(config);
  return config;
};
