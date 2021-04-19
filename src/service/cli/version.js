'use strict';

const chalk = require(`chalk`);
const packageJsonFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chalk.blue(packageJsonFile.version));
  }
};
