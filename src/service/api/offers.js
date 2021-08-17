'use strict';

const Router = require(`express`);
const {HTTP_CODES} = require(`../../constants`);
const route = new Router();
const {
  newOfferValidator,
  offerAttrValidator
} = require(`../../validators/offerValidator`);
const commentsValidator = require(`../../validators/commentsValidator`);

module.exports = (app, offersService, commentsService) => {
  app.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;
    let result;
    if (limit || offset) {
      result = await offersService.findPage({limit, offset});
    } else {
      result = await offersService.findAll(comments);
    }
    res.status(HTTP_CODES.OK).json(result);
  });
  route.get(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    const haveOffer = await offersService.findOne(offerId);

    if (!haveOffer) {
      return res.status(HTTP_CODES.BAD_REQUEST)
        .send(`Can not update, no such id: ${offerId} in offers`);
    }

    return res.status(HTTP_CODES.OK).json(haveOffer);
  });
  route.post(`/`, newOfferValidator, async (req, res) => {
    const offer = await offersService.create(req.body);

    return res.status(HTTP_CODES.CREATED).json(offer);
  });
  route.put(`/:offerId`, offerAttrValidator, async (req, res) => {
    const {offerId} = req.params;
    const haveOffer = await offersService.findOne(offerId);

    if (!haveOffer) {
      return res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can not update, no such id: ${offerId} in offers`);
    }

    const newOffer = await offersService.update(offerId, req.body);
    return res.status(HTTP_CODES.OK).json(newOffer);
  });
  route.delete(`/:offerId`, async (req, res) => {
    const {offerId} = req.params;
    const haveOffer = await offersService.findOne(offerId);

    if (!haveOffer) {
      return res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can not delete, no such id: ${offerId} in offers`);
    }

    await offersService.drop(offerId);

    return res.status(HTTP_CODES.OK).send(`Successfully deleted id: ${offerId}`);
  });
  route.get(`/:offerId/comments`, async (req, res) => {
    const {offerId} = req.params;
    const offer = await offersService.findOne(offerId);

    if (!offer) {
      return res.status(HTTP_CODES.BAD_REQUEST).send(`No offer with such id: ${offerId}`);
    }
    const comments = await commentsService.findAll(offer.id);

    return res.status(HTTP_CODES.OK).json(comments);
  });
  route.delete(`/:offerId/comments/:commentId`, async (req, res) => {
    const {offerId, commentId} = req.params;
    const offer = await offersService.findOne(offerId);

    if (!offer) {
      return res.status(HTTP_CODES.BAD_REQUEST)
        .send(`Can not delete, no such id: ${offerId} in offers`);
    }

    const commentsByIdOffer = await commentsService.findAll(offer.id);
    const haveComment = commentsByIdOffer.some(({id}) => id === +commentId);

    if (!haveComment) {
      return res.status(HTTP_CODES.BAD_REQUEST)
        .send(`Can not delete, no such comment with id: ${commentId} in offer id: ${offerId}`);
    }
    await commentsService.destroy(offer.id, commentId);

    return res.status(HTTP_CODES.OK).send(`Comment with id: ${commentId} was successfully deleted from offer id: ${offerId}`);

  });
  route.post(`/:offerId/comments`, commentsValidator, async (req, res) => {
    const {offerId} = req.params;
    const offer = await offersService.findOne(offerId);

    if (!offer) {
      return res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can not add comment, no such id: ${offerId} in offers`);
    }

    const newComment = await commentsService.create(offer.id, req.body);

    return res.status(HTTP_CODES.CREATED).json(newComment);
  });
};
