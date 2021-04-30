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

  route.get(`/`, (req, res) => res.status(HTTP_CODES.OK).json(offersService.findAll()));
  route.get(`/:offerId`, (req, res) => res.status(HTTP_CODES.OK).json(offersService.findOne(req.params.offerId)));
  route.post(`/`, newOfferValidator, (req, res) => res.status(HTTP_CODES.CREATED).json(offersService.create(req.body)));
  route.put(`/:offerId`, offerAttrValidator, (req, res) => {
    const id = req.params.offerId;
    const haveOffer = offersService.findOne(id);

    if (!haveOffer) {
      res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can not update, no such id: ${id} in offers`);
    }

    res.status(HTTP_CODES.OK).json(offersService.update(id, req.body));
  });
  route.delete(`/:offerId`, (req, res) => {
    const id = req.params.offerId;
    const haveOffer = offersService.findOne(id);

    if (!haveOffer) {
      return res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can not delete, no such id: ${id} in offers`);
    }

    return res.status(HTTP_CODES.OK).json(offersService.delete(id));
  });
  route.get(`/:offerId/comments`, (req, res) => {
    const {offerId} = req.params;
    const offer = offersService.findOne(offerId);
    res.status(HTTP_CODES.OK).json(commentsService.findAll(offer));
  });
  route.delete(`/:offerId/comments/:commentId`, (req, res) => {
    const {offerId, commentId} = req.params;
    const offer = offersService.findOne(offerId);
    res.status(HTTP_CODES.OK).json(commentsService.delete(offer, commentId));

  });
  route.post(`/:offerId/comments`, commentsValidator, (req, res) => {
    const id = req.params.offerId;
    const offer = offersService.findOne(id);

    if (!offer) {
      return res.status(HTTP_CODES.NOT_FOUND)
        .send(`Can add comment, no such id: ${id} in offers`);
    }
    return res.status(HTTP_CODES.OK).json(commentsService.create(offer, req.body));
  });
};
