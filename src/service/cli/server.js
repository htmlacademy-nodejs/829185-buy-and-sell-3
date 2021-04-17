'use strict';

const {HTTP_CODES} = require(`../../constants`);
const {readFile} = require(`fs/promises`);
const chalk = require(`chalk`);
const http = require(`http`);
const DEFAULT_SERVER_PORT = 3000;
const FILENAME = `mocks.json`;

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HTTP_CODES.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HTTP_CODES.NOT_FOUND, notFoundMessageText);
      }

      break;
    default:
      sendResponse(res, HTTP_CODES.NOT_FOUND, notFoundMessageText);
      break;
  }
};

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>Some random offer</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const serverPort = Number.parseInt(customPort, 10) || DEFAULT_SERVER_PORT;

    http.createServer(onClientConnect)
      .listen(serverPort)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(chalk.red(`Ошибка при создании сервера`, err));
        }

        return console.info(chalk.green(`Ожидаю соединений на ${serverPort}`));
      });
  }
};
