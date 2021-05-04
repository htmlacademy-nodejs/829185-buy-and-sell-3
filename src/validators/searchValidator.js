'use strict';

const {HTTP_CODES} = require(`../constants`);

module.exports = (req, res, next) => {
  if (typeof req.query.q !== `string` || !req.query.q.length) {
    res.status(HTTP_CODES.BAD_REQUEST).send(`Bad request`);
    return;
  }

  next();
};
