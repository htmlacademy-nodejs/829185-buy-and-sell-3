'use strict';

const express = require(`express`);
const app = express();
const {HTTP_CODES, JSON_LIMIT} = require(`../../constants`);
const DEFAULT_SERVER_PORT = 3000;
const initAPI = require(`../api`);
const {getMocks} = require(`../utils`);
const {getLogger} = require(`../../logger/logger`);
const logger = getLogger();

app.use(express.json({limit: JSON_LIMIT}));
app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

module.exports = {
  app,
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const serverPort = Number.parseInt(customPort, 10) || DEFAULT_SERVER_PORT;
    const mockData = await getMocks();
    const routes = initAPI(mockData);
    app.use(`/api`, routes);
    app.use((req, res) => {
      logger.error(req.path);
      res.status(HTTP_CODES.NOT_FOUND).send(`Not found`);
    });

    app.listen(DEFAULT_SERVER_PORT, (err) => {
      if (err) {
        return logger.error(`Something went wrong with creating a server`, err);
      }

      return logger.info(`Waiting for connections on port: ${serverPort}`);
    });
  }
};
