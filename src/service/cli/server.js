'use strict';

const express = require(`express`);
const app = express();
const {HTTP_CODES} = require(`../../constants`);
const chalk = require(`chalk`);
const DEFAULT_SERVER_PORT = 3000;
const routes = require(`../api`);

app.use(express.json());
app.use(`/api`, routes);


app.use((req, res) => res
  .status(HTTP_CODES.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const serverPort = Number.parseInt(customPort, 10) || DEFAULT_SERVER_PORT;

    app.listen(DEFAULT_SERVER_PORT, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера`, err));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${serverPort}`));
    });
  }
};
