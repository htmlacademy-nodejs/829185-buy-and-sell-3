'use strict';

const {HTTP_CODES} = require(`../constants`);

module.exports = (req, res, next) => {
  const {search} = req.query;

  if (typeof search !== `string` || !search.length) {
    return res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
