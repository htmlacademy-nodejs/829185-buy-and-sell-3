'use strict';

const {Router} = require(`express`);
const {HTTP_CODES} = require(`../../constants`);
const userValidator = require(`../../validators/userValidator`);
const passwordUtils = require(`../lib/password`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/user`, route);

  route.post(`/`, userValidator(service), async (req, res) => {
    const data = req.body;
    data.passwordHash = await passwordUtils.hash(data.password);
    const result = await service.create(data);
    delete result.passwordHash;
    res.status(HTTP_CODES.CREATED)
      .json(result);
  });
};
