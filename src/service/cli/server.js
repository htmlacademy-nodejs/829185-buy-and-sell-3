'use strict';


//
// app.get(`/offers`, async (req, res) => {
//   try {
//     const fileContent = await readFile(FILENAME);
//     const mocks = JSON.parse(fileContent);
//     res.json(mocks);
//   } catch (err) {
//     res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
//   }
// });
// app.use(express.json());
// app.use((req, res) => res
//   .status(HTTP_CODES.NOT_FOUND)
//   .send(`Not found`));
//
// app.listen(DEFAULT_SERVER_PORT);

const express = require(`express`);
const app = express();
const {HTTP_CODES} = require(`../../constants`);
const {readFile} = require(`fs/promises`);
const chalk = require(`chalk`);
const DEFAULT_SERVER_PORT = 3000;
const FILENAME = `mocks.json`;

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(err);
  }
});

app.use(express.json());
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
