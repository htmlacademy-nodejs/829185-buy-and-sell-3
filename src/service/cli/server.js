'use strict';

const express = require(`express`);
const app = express();
const FILENAME = `mocks.json`;
const {readFile} = require(`fs/promises`);
const {HTTP_CODES} = require(`../../constants`);
const DEFAULT_SERVER_PORT = 3000;

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

app.listen(DEFAULT_SERVER_PORT);
