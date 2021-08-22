'use strict';

const {HTTP_CODES} = require(`../constants`);
const Joi = require(`joi`);
const minCategoryCount = 1;
const minTitleLength = 10;
const maxTitleLength = 100;
const minDescriptionLength = 50;
const maxDescriptionLength = 1000;
const minSumValue = 100;

const schema = Joi.object({
  categories: Joi.array().items(
      Joi.number().integer().positive()
  ).min(minCategoryCount).required(),
  title: Joi.string().min(minTitleLength).max(maxTitleLength).required(),
  description: Joi.string().min(minDescriptionLength).max(maxDescriptionLength).required(),
  picture: Joi.string().required(),
  type: Joi.any().valid(`offer`, `sale`).required(),
  sum: Joi.number().integer().greater(minSumValue).required()
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
