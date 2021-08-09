'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const offer = require(`./offers`);
const OffersDataService = require(`../../services/offers`);
const CommentsDataService = require(`../../services/comments`);

const {HTTP_CODES} = require(`../../constants`);

const {
  mockOffers,
  newValidOffer,
  notExistingOffer,
  newInvalidOffer,
  validOfferNewAttr,
  inValidOfferNewAttr,
  validNewComment,
  invalidNewComment,
  mockCategories
} = require(`./test_mocks`);

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  const categories = mockCategories.map(({name}) => name);
  await initDB(mockDB, {categories, offers: mockOffers});
  const app = express();
  app.use(express.json());
  offer(app, new OffersDataService(mockDB), new CommentsDataService(mockDB));

  return app;
};

describe(`Offers API end-points`, () => {

  describe(`When post /offers`, () => {
    let response;
    let app;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .post(`/offers`)
        .send(newValidOffer);
    });

    it(`With valid offer, response code should be 201`, () => expect(response.statusCode).toBe(HTTP_CODES.CREATED));
    it(`With valid offer, response body.title equals to mock`, () => expect(response.body.title).toEqual(newValidOffer.title));
    it(`With invalid offer, response code should be 400`, async () => {
      response = await request(app).post(`/offers`).send(newInvalidOffer);

      expect(response.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });
  });

  describe(`When get /offers`, () => {
    let response;

    beforeAll(async () => {
      const app = await createAPI();
      response = await request(app)
        .get(`/offers`);
    });

    it(`Response code should be 200`, () => expect(response.statusCode).toBe(HTTP_CODES.OK));
    it(`Returns a list of 3 offers`, () => expect(response.body.length).toBe(3));
    it(`First offer's id equals 1`, () => expect(response.body[0].id).toBe(1));
  });

  describe(`When get /offers/:offerId`, () => {
    let response;

    beforeAll(async () => {
      const app = await createAPI();
      response = await request(app)
        .get(`/offers/1`);
    });

    it(`Response code should be 200`, () => expect(response.statusCode).toBe(HTTP_CODES.OK));
    it(`Response offer title should be equal to mocks`, () => expect(response.body.title).toEqual(mockOffers[0].title));
  });

  it(`When get /offers with invalid offer id, response code should be 400`, async () => {
    const app = await createAPI();
    let response = await request(app).get(`/offers/NOT_EXISTING_ID`);

    expect(response.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  describe(`When put /offers/:id to update offer with valid attr`, () => {
    let response;

    beforeAll(async () => {
      const app = await createAPI();
      response = await request(app)
        .put(`/offers/1`)
        .send(validOfferNewAttr);
    });

    it(`Response code should be 200`, () => expect(response.statusCode).toBe(HTTP_CODES.OK));
    it(`Response.title should be equal to mock title`, () => expect(response.body).toBeTruthy());
  });

  describe(`When put /offers/:id `, () => {
    let response; let app;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app)
        .put(`/offers/not_existing_id`)
        .send(notExistingOffer);
    });

    it(`to update not existing offer, response code should be 400`, async () => {
      expect(response.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });

    it(`to update existing offer with invalid attr, response code should be 400`, async () => {
      response = await request(app).put(`/offers/1`).send(inValidOfferNewAttr);

      expect(response.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });
  });

  describe(`When delete /offers/:id`, () => {
    let app; let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app).delete(`/offers/1`);
    });

    it(`Response code should be 200`, () => expect(response.statusCode).toBe(HTTP_CODES.OK));

    it(`Second try to delete same id should return 404`, async () => {
      response = await request(app).delete(`/offers/1`);

      expect(response.statusCode).toBe(HTTP_CODES.NOT_FOUND);
    });
  });

  describe(`When delete /offers/:offerId/comments/:commentId`, () => {
    let app; let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app).delete(`/offers/1/comments/1`);
    });

    it(`Response code should be 200`, async () => expect(response.statusCode).toBe(HTTP_CODES.OK));

    it(`Not existing offerId, response code should be 400`, async () => {
      response = await request(app).delete(`/offers/NOT_EXISTING)OFFER/comments/1`);

      expect(response.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });

    it(`Not existing commentId, response code should be 400`, async () => {
      response = await request(app).delete(`/offers/1/comments/NOT_EXISTING)OFFER`);

      expect(response.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });
  });

  describe(`When post /offers/:offerId/comments`, () => {
    let app; let response;

    beforeAll(async () => {
      app = await createAPI();
      response = await request(app).post(`/offers/1/comments`).send(validNewComment);
    });

    it(`With valid comment, response code should be 201`, () => expect(response.statusCode).toBe(HTTP_CODES.CREATED));

    it(`With invalid comment, response code should be 400`, async () => {
      response = await request(app).post(`/offers/1/comments`).send(invalidNewComment);

      expect(response.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    });
  });
});
