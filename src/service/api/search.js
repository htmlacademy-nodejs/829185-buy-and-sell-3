'use strict';

const Router = require(`express`);
const {HTTP_CODES} = require(`../../constants`);
const route = new Router();
const offersValidator = require(`../../validators/searchValidator`);

module.exports = (app, service) => {
  app.use(`/search`, route);
  route.get(`/`, offersValidator, (req, res) => res.status(HTTP_CODES.OK).json(service.findAll(req.query.q)));
};
