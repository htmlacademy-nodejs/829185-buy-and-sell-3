'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);
const initAPI = require(`../api`);
const {HTTP_CODES} = require(`../../constants`);

const {
  mockOffers,
  newValidOffer,
  notExistingOffer,
  newInvalidOffer,
  validOfferNewAttr,
  inValidOfferNewAttr,
  validNewComment,
  invalidNewComment
} = require(`./test_mocks`);

const routes = initAPI(mockOffers);

const apiOffers = `/api/offers`;

app.use(`/api`, routes);

describe(`Offers API end-points`, () => {
  test(`When get /api/offers response code should be 200`, async () => {
    const res = await request(app).get(`${apiOffers}`);
    expect(res.statusCode).toBe(HTTP_CODES.OK);
  });

  test(`When get /api/offers response body should be equal to mocks`, async () => {
    const res = await request(app).get(`${apiOffers}`);
    expect(res.body).toEqual(mockOffers);
  });

  test(`When get /api/offers/:offerId with valid offer id, response code should be 200`, async () => {
    const res = await request(app).get(`${apiOffers}/PJFByiybVqeNBxWLqm3Li`);
    expect(res.statusCode).toBe(HTTP_CODES.OK);
  });

  test(`When get /api/offers/:offerId response obj should be with a requesting id`, async () => {
    const res = await request(app).get(`${apiOffers}/PJFByiybVqeNBxWLqm3Li`);
    expect(res.body).toEqual(mockOffers[0]);
  });

  test(`When get /api/offers/:offerId and requesting id not in the mocks, response code should be 400`, async () => {
    const res = await request(app).get(`${apiOffers}/not_in_mocks`);
    expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test(`When post /api/offers with new valid offer, response code should be 201`, async () => {
    const res = await request(app).post(`${apiOffers}`).send(newValidOffer);
    expect(res.statusCode).toBe(HTTP_CODES.CREATED);
  });

  test(`When post /api/offers with new invalid offer, response code should be 400`, async () => {
    const res = await request(app).post(`${apiOffers}`).send(newInvalidOffer);
    expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test(`When put /api/offers/:id to update offer with valid attr, response code should be 200`, async () => {
    const res = await request(app).put(`${apiOffers}/PJFByiybVqeNBxWLqm3Li`).send(validOfferNewAttr);
    expect(res.statusCode).toBe(HTTP_CODES.OK);
  });

  test(`When put /api/offers/:id to update offer with valid attr, this offer should change this attr`, async () => {
    const res = await request(app).put(`${apiOffers}/PJFByiybVqeNBxWLqm3Li`).send(validOfferNewAttr);
    expect(res.body.title).toBe(validOfferNewAttr.title);
  });

  test(`When put /api/offers/:id to update offer with invalid attr, response code should be 400`, async () => {
    const res = await request(app).put(`${apiOffers}/PJFByiybVqeNBxWLqm3Li`).send(inValidOfferNewAttr);
    expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test(`When put /api/offers/:id to update not existing offer, response code should be 400`, async () => {
    const res = await request(app).put(`${apiOffers}/not_existing_id`).send(notExistingOffer);
    expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test(`When delete /api/offers/:id to delete offer, response code should be 200`, async () => {
    const res = await request(app).delete(`${apiOffers}/vDaoVd8iNfcT28K3Gl7PO`);
    expect(res.statusCode).toBe(HTTP_CODES.OK);
  });

  test(`When delete /api/offers/:id to delete offer, response code should be 400`, async () => {
    const res = await request(app).delete(`${apiOffers}/not_existing_id`);
    expect(res.statusCode).toBe(HTTP_CODES.NOT_FOUND);
  });

  test(`When get /api/offers/:id/comments, response code should be 200`, async () => {
    const res = await request(app).delete(`${apiOffers}/PJFByiybVqeNBxWLqm3Li`);
    expect(res.statusCode).toBe(HTTP_CODES.OK);
  });

  test(`When get /api/offers/:id/comments not existing id, response code should be 400`, async () => {
    const res = await request(app).get(`${apiOffers}/not_existing/comments`);
    expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test(`When delete /api/offers/:offerId/comments/:commentId, response code should be 200`, async () => {
    const res = await request(app).delete(`${apiOffers}/-UC_7IhPJXSRbTMuOm1zz/comments/gNh-AAh9YoFJ2TJhpqnoX`);
    expect(res.statusCode).toBe(HTTP_CODES.OK);
  });

  test(`When delete /api/offers/:offerId/comments/:commentId not existing offerId, response code should be 400`, async () => {
    const res = await request(app).delete(`${apiOffers}/not_existing_offer_id/comments/SYkbVLBncVyNQMupmjZI-`);
    expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test(`When delete /api/offers/:offerId/comments/:commentId not existing commentId, response code should be 400`, async () => {
    const res = await request(app).delete(`${apiOffers}/PJFByiybVqeNBxWLqm3Li/comments/not_existing_comment_id`);
    expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test(`When post /api/offers/:offerId/comments add valid comment, response code should be 201`, async () => {
    const res = await request(app).post(`${apiOffers}/-UC_7IhPJXSRbTMuOm1zz/comments`).send(validNewComment);
    expect(res.statusCode).toBe(HTTP_CODES.CREATED);
  });

  test(`When post /api/offers/:offerId/comments add invalid comment, response code should be 400`, async () => {
    const res = await request(app).post(`${apiOffers}/PJFByiybVqeNBxWLqm3Li/comments`).send(invalidNewComment);
    expect(res.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });
});
