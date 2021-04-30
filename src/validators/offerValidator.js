'use strict';

const {HTTP_CODES} = require(`../constants`);
const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];

const newOfferValidator = (req, res, next) => {
  const newOfferKeys = Object.keys(req.body);
  if (!offerKeys.every((key) => newOfferKeys.includes(key))) {
    res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`);
    return;
  }

  next();
};

const newOfferAttrValidator = (req, res, next) => {
  const newOfferKeys = Object.keys(req.body);
  if (!offerKeys.includes(...newOfferKeys)) {
    res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`);
    return;
  }

  next();
};

module.exports = {
  newOfferValidator,
  newOfferAttrValidator
};
