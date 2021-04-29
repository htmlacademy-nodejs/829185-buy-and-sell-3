'use strict';

const express = require(`express`);
const app = express();
const mocksService = require(`../../services/mocksService`);
const {HTTP_CODES} = require(`../../constants`);
const chalk = require(`chalk`);
const DEFAULT_SERVER_PORT = 3000;
const {readFile} = require(`fs/promises`);
const {validateOffer, validateOfferAttr, validateComment} = require('../utils');

const readOffers = async () => {
  const FILENAME = `mocks.json`;
  try {
    const fileContent = await readFile(FILENAME);
    return JSON.parse(fileContent);
  } catch (err) {
    return console.error(`Something went wrong ${err}`);
  }
}

let MS;
(async () => {
  const mockData = await readOffers();
  MS = new mocksService(mockData);
})();

// GET /api/search?query= — возвращает результаты поиска. Поиск объявлений выполняется по наименованию. Объявление соответствует поиску в случае наличия хотя бы одного вхождения искомой фразы.
app.use(express.json());

app.get(`/api/offers`, (req, res) => res.json(MS.getAll()));
app.get(`/api/offers/:offerId`, (req, res) => res.json(MS.getById(req.params.offerId)));
app.get(`/api/categories`, (req, res) => res.json(MS.getCategories()));
app.post(`/api/offers`, (req, res) => {
  if (validateOffer(req.body)) {
    MS.create(req.body);
    res.status(HTTP_CODES.CREATED).send(`Successfully created`);
  } else {
    res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`);
  }
});
app.put(`/api/offers/:offerId`, (req, res) => {
  if (validateOfferAttr(req.body)) {
    MS.change(req.params.offerId, req.body);
    res.status(HTTP_CODES.CREATED).json(MS.getById(req.params.offerId));
  } else {
    res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`);
  }
});
app.delete(`/api/offers/:offerId`, (req, res) => {
  MS.delete(req.params.offerId) ?
    res.status(HTTP_CODES.OK).send(`Successfully deleted`)
    :
    res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`);
});
app.get(`/api/offers/:offerId/comments`, (req, res) => res.json(MS.commentsByItemId(req.params.offerId)));
app.delete(`/api/offers/:offerId/comments/:commentId`, (req, res) => {
  MS.deleteCommentById(req.params.offerId, req.params.commentId) ? res.status(HTTP_CODES.OK).send(`Successfully deleted`) : res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`)
});
app.post(`/api/offers/:offerId/comments`, (req, res) => {
  if (validateComment(req.body)) {
    console.log(MS.commentsByItemId(req.params.offerId));
    MS.addCommentsByItemId(req.params.offerId, req.body);
    console.log(MS.commentsByItemId(req.params.offerId));
    res.status(HTTP_CODES.CREATED).send(`Successfully created`);
  } else {
    res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`);
  }
});
app.get(`/api/search`, (req, res) => res.send(req.query.q));


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
