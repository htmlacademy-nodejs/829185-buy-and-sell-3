'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);
const initAPI = require(`../api`);
const {HTTP_CODES} = require(`../../constants`);

const {
  mockOffers
} = require(`./test_mocks`);

const routes = initAPI(mockOffers);

app.use(`/api`, routes);

describe(`Categories API end-points`, () => {
  test(`When get /api/categories, response code should be 200`, async () => {
    const res = await request(app).get(`/api/categories`);
    expect(res.statusCode).toBe(HTTP_CODES.OK);
  });

  test(`When get /api/categories, response body should be an array`, async () => {
    const res = await request(app).get(`/api/categories`);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
