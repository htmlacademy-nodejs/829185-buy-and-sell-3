'use strict';

const help = require(`./help`);
const generate = require(`./generate`);
const version = require(`./version`);
const server = require(`./server`);
const fill = require(`./fill`);

const Cli = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
  [fill.name]: fill,
  [server.name]: server
};

module.exports = {
  Cli,
};
