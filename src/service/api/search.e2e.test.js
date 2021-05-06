'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);
const initAPI = require(`../api`);
const {HTTP_CODES} = require(`../../constants`);

const {
  mockOffers
} = require(`./test_mocks`);

const routes = initAPI(mockOffers);

const apiSearch = `/api/search?q=`;

app.use(`/api`, routes);

describe(`Search API end-points`, () => {
  test(`When get /api/search empty request, response code should be 400`, async () => {
    const res = await request(app).get(`${apiSearch}`);
    expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test(`When get /api/search with valid request, response body should be an array`, async () => {
    const res = await request(app).get(`${apiSearch}ip`);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test(`When get /api/search with valid request, response code should be 200`, async () => {
    const res = await request(app).get(`${apiSearch}ip`);
    expect(res.statusCode).toBe(HTTP_CODES.OK);
  });
});
