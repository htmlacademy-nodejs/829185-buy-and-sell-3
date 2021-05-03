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

  route.get(`/`, (req, res) => {
    const result = offersService.findAll();

    return res.status(HTTP_CODES.OK).json(result);
  });
  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offersService.findOne(offerId);

    return res.status(HTTP_CODES.OK).json(offer);
  });
  route.post(`/`, newOfferValidator, (req, res) => {
    const offer = offersService.create(req.body);

    return res.status(HTTP_CODES.CREATED).json(offer);
  });
  route.put(`/:offerId`, offerAttrValidator, (req, res) => {
    const {offerId} = req.params;
    const haveOffer = offersService.findOne(offerId);

    if (!haveOffer) {
      return res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can not update, no such id: ${offerId} in offers`);
    }

    const newOffer = offersService.update(offerId, req.body);
    return res.status(HTTP_CODES.OK).json(newOffer);
  });
  route.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const haveOffer = offersService.findOne(offerId);

    if (!haveOffer) {
      return res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can not delete, no such id: ${offerId} in offers`);
    }

    offersService.delete(offerId);

    return res.status(HTTP_CODES.OK).send(`Successfully deleted id: ${offerId}`);
  });
  route.get(`/:offerId/comments`, (req, res) => {
    const {offerId} = req.params;
    const offer = offersService.findOne(offerId);
    const comments = commentsService.findAll(offer);

    return res.status(HTTP_CODES.OK).json(comments);
  });
  route.delete(`/:offerId/comments/:commentId`, (req, res) => {
    const {offerId, commentId} = req.params;
    const offer = offersService.findOne(offerId);
    const haveComment = offer.comments.some(({id}) => id === commentId);

    if (!haveComment) {
      return res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can not delete, no such comment with id: ${commentId} in offer id: ${offerId}`);
    }
    commentsService.delete(offer, commentId);

    return res.status(HTTP_CODES.OK).send(`Comment with id: ${commentId} was successfully deleted from offer id: ${offerId}`);

  });
  route.post(`/:offerId/comments`, commentsValidator, (req, res) => {
    const {offerId} = req.params;
    const offer = offersService.findOne(offerId);

    if (!offer) {
      return res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can not add comment, no such id: ${offerId} in offers`);
    }

    const newComment = commentsService.create(offer, req.body);

    return res.status(HTTP_CODES.OK).json(newComment);
  });
};
