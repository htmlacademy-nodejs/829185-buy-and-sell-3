'use strict';

const express = require(`express`);
const app = express();
const {HTTP_CODES, JSON_LIMIT} = require(`../../constants`);
const chalk = require(`chalk`);
const DEFAULT_SERVER_PORT = 3000;
const initAPI = require(`../api`);
const {getMocks} = require(`../utils`);

app.use(express.json({limit: JSON_LIMIT}));

module.exports = {
  app,
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const serverPort = Number.parseInt(customPort, 10) || DEFAULT_SERVER_PORT;
    const mockData = await getMocks();
    const routes = initAPI(mockData);
    app.use(`/api`, routes);
    app.use((req, res) => res
      .status(HTTP_CODES.NOT_FOUND)
      .send(`Not found`));

    app.listen(DEFAULT_SERVER_PORT, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${serverPort}`));
    });
  }
};
