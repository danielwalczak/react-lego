require('./environment');
const { SRC } = require('./paths');
const defaultConfig = require('./webpack.common');

const devConfig = Object.assign({}, defaultConfig, {
  entry: { app: [`${SRC}/client-entry.js`] }
});

module.exports = devConfig;
