'use strict';

const {HTTP_CODES} = require(`../constants`);

module.exports = (req, res, next) => {
  const {query} = req.query;
  if (typeof query !== `string` || !query.length) {
    res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`);
  }

  next();
};
