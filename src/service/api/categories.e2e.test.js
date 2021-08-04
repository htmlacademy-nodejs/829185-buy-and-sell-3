'use strict';

const request = require(`supertest`);
const express = require(`express`);
const {HTTP_CODES} = require(`../../constants`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const DataService = require(`../../services/categories`);
const {
  mockOffers,
  mockCategories
} = require(`./test_mocks`);
const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, offers: mockOffers});
  category(app, new DataService(mockDB));
});

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/api/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.OK));

  // test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(3));
  //
  // test(`Category names are "Журналы", "Игры", "Животные"`,
  //   () => expect(response.body.map((it) => it.name)).toEqual(
  //     expect.arrayContaining([`Журналы`, `Игры`, `Животные`])
  //   )
  // );
});

// describe(`Categories API end-points`, () => {
//   test(`When get /api/categories, response code should be 200`, async () => {
//     const res = await request(app).get(`/api/categories`);
//     expect(res.statusCode).toBe(HTTP_CODES.OK);
//   });
//
//   test(`When get /api/categories, response body should be an array`, async () => {
//     const res = await request(app).get(`/api/categories`);
//     expect(Array.isArray(res.body)).toBeTruthy();
//   });
// });
