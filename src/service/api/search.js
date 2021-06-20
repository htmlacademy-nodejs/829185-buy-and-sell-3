'use strict';

const Router = require(`express`);
const {HTTP_CODES} = require(`../../constants`);
const route = new Router();
const searchValidator = require(`../../validators/searchValidator`);

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, searchValidator, (req, res) => {
    const response = service.findAll(req.query.query);

    return res.status(HTTP_CODES.OK).json(response);
  });
};
