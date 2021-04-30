'use strict';

const Router = require(`express`);
const {HTTP_CODES} = require(`../../constants`);
const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);
  route.get(`/`, (req, res) => res.status(HTTP_CODES.OK).json(service.findAll()));
};
