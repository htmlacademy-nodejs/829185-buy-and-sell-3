'use strict';

const Joi = require(`joi`);
const minCategoryCount = 1;
const minTitleLength = 10;
const maxTitleLength = 100;
const minDescriptionLength = 50;
const maxDescriptionLength = 1000;
const minSumValue = 100;

const offerBaseSchema = Joi.object({
  user: Joi.string().email(),
  categories: Joi.array().items(
      Joi.number().integer().positive()
  ).min(minCategoryCount),
  title: Joi.string().min(minTitleLength).max(maxTitleLength),
  description: Joi.string().min(minDescriptionLength).max(maxDescriptionLength),
  picture: Joi.string(),
  type: Joi.any().valid(`offer`, `sale`),
  sum: Joi.number().integer().greater(minSumValue)
});

module.exports = offerBaseSchema;
