'use strict';

const {HTTP_CODES} = require(`../constants`);
const Joi = require(`joi`);
const minOfferId = 1;
const minCommentId = 1;

const schema = Joi.object({
  offerId: Joi.number().integer().min(minOfferId),
  commentId: Joi.number().integer().min(minCommentId)
});

module.exports = (req, res, next) => {
  const params = req.params;
  const {error} = schema.validate(params);

  if (error) {
    return res.status(HTTP_CODES.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }
  return next();
};
