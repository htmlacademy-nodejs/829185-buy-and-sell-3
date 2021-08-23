'use strict';

const {HTTP_CODES} = require(`../constants`);
const Joi = require(`joi`);
const offerBaseSchema = require(`./offerBaseSchema`);

const schema = offerBaseSchema.keys({
  categories: Joi.required(),
  title: Joi.required(),
  description: Joi.required(),
  picture: Joi.required(),
  type: Joi.required(),
  sum: Joi.required()
});

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const {error} = schema.validate(newOffer);

  if (error) {
    return res.status(HTTP_CODES.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
