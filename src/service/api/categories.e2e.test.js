'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const category = require(`./categories`);
const DataService = require(`../../services/categories`);

const {HTTP_CODES} = require(`../../constants`);

const {
  mockOffers,
  mockCategories
} = require(`./test_mocks`);

const createAPI = async () => {
  const categories = mockCategories.map(({name}) => name);
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  const app = express();
  app.use(express.json());

  await initDB(mockDB, {categories, offers: mockOffers});
  category(app, new DataService(mockDB));

  return app;
};

describe(`API returns category list`, () => {
  let response; let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .get(`/categories`);
  });

  it(`Status code 200`, () => {
    expect(response.statusCode).toBe(HTTP_CODES.OK);
  });

  it(`Returns list of 12 categories`, () => {
    expect(response.body.length).toBe(12);
  });

  it(`Category names are "Журналы", "Игры", "Животные"`,
      () => expect(response.body.map((it) => it.name)).toEqual(
          expect.arrayContaining([`Журналы`, `Игры`, `Животные`])
      )
  );
});
