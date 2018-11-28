const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const PKG = require("./package.json");
const BUILD_DATE = new Date();

const MANIFEST = {
  name: `${PKG.name}`,
  version: `${PKG.version}`,
  buildDate: `${BUILD_DATE.toISOString()}`
};

const manifestFile = path.join('src', 'assets', 'app-manifest.json');

// Write environment file
fs.writeFileSync(manifestFile, JSON.stringify(MANIFEST, null, 2));
console.log('\x1b[32m%s\x1b[0m', `Manifest file written in ${manifestFile}`);

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'APP_MANIFEST': JSON.stringify(MANIFEST)
    })
  ]
};
