'use strict';

const {HTTP_CODES} = require(`../constants`);
const Joi = require(`joi`);
const offerBaseSchema = require(`./offerBaseSchema`);
const minOfferId = 1;
const minCommentId = 1;

const schemaNewOffer = Joi.object({
  offerId: Joi.number().integer().min(minOfferId),
  commentId: Joi.number().integer().min(minCommentId)
});

module.exports = (req, res, next) => {
  const {params, body} = req;
  const validateNewOffer = schemaNewOffer.validate(params);
  const validateNewOfferAttr = offerBaseSchema.validate(body);
  const error = {...validateNewOffer.error, ...validateNewOfferAttr.error};

  if (error.details) {
    return res.status(HTTP_CODES.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }
  return next();
};
