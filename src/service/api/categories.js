'use strict';

const Router = require(`express`);
const {HTTP_CODES} = require(`../../constants`);
const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);
  route.get(`/`, async (req, res) => {
    const {count} = req.query;
    const categories = await service.findAll(count);

    res.status(HTTP_CODES.OK)
      .json(categories);
  });
};
