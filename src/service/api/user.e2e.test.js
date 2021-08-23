'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const user = require(`./user`);
const DataService = require(`../../services/user`);
const {HTTP_CODES} = require(`../../constants`);

const {
  mockOffers,
  mockCategories,
  users,
  validUser
} = require(`./test_mocks`);

const createAPI = async () => {
  const categories = mockCategories.map(({name}) => name);
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories, offers: mockOffers, users});
  const app = express();
  app.use(express.json());
  user(app, new DataService(mockDB));

  return app;
};

describe(`User API end-points`, () => {
  describe(`Creating new user, response code should be 201`, () => {
    let response;

    beforeAll(async () => {
      let app = await createAPI();
      response = await request(app)
        .post(`/user`)
        .send(validUser);
    });

    test(`Status code 201`, () => expect(response.statusCode).toBe(HTTP_CODES.CREATED));
  });

  describe(`API refuses to create user if data is invalid`, () => {

    let app;

    beforeAll(async () => {
      app = await createAPI();
    });

    test(`Without any required property response code is 400`, async () => {
      for (const key of Object.keys(validUser)) {
        const badUserData = {...validUser};
        delete badUserData[key];
        await request(app)
          .post(`/user`)
          .send(badUserData)
          .expect(HTTP_CODES.BAD_REQUEST);
      }
    });

    test(`When field type is wrong response code is 400`, async () => {
      const badUsers = [
        {...validUser, firstName: true},
        {...validUser, email: 1}
      ];
      for (const badUserData of badUsers) {
        await request(app)
          .post(`/user`)
          .send(badUserData)
          .expect(HTTP_CODES.BAD_REQUEST);
      }
    });

    test(`When field value is wrong response code is 400`, async () => {
      const badUsers = [
        {...validUser, password: `short`, passwordRepeated: `short`},
        {...validUser, email: `invalid`}
      ];
      for (const badUserData of badUsers) {
        await request(app)
          .post(`/user`)
          .send(badUserData)
          .expect(HTTP_CODES.BAD_REQUEST);
      }
    });

    test(`When password and passwordRepeated are not equal, code is 400`, async () => {
      const badUserData = {...validUser, passwordRepeated: `not sidorov`};
      await request(app)
        .post(`/user`)
        .send(badUserData)
        .expect(HTTP_CODES.BAD_REQUEST);
    });

    test(`When email is already in use status code is 400`, async () => {
      const badUserData = {...validUser, email: `ivanov@example.com`};
      await request(app)
        .post(`/user`)
        .send(badUserData)
        .expect(HTTP_CODES.BAD_REQUEST);
    });
  });
});
