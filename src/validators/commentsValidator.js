'use strict';

const Joi = require(`joi`);
const {HTTP_CODES} = require(`../constants`);
const commentMinTextLength = 20;

const schema = Joi.object({
  user: Joi.string().email().required(),
  name: Joi.string().min(commentMinTextLength).required()
});

module.exports = (req, res, next) => {
  const comment = req.body;
  const {error} = schema.validate(comment);

  if (error) {
    return res.status(HTTP_CODES.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
