'use strict';

const {HTTP_CODES} = require(`../constants`);
const Joi = require(`joi`);

const schema = Joi.object().keys({
  search: Joi.string().required()
});

module.exports = (req, res, next) => {
  const {error} = schema.validate(req.query);

  if (error) {
    return res.status(HTTP_CODES.BAD_REQUEST)
      .send(error.details.map((err) => err.message).join(`\n`));
  }

  return next();
};
