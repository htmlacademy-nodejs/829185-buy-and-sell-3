'use strict';

const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(packageJsonFile.version);
  }
};
