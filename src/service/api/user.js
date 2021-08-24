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

  route.post(`/auth`, async (req, res) => {
    const {email, password} = req.body;
    const user = await service.findByEmail(email);

    if (!user) {
      res.status(HTTP_CODES.UNAUTHORIZED).send(`Email is incorrect`);
      return;
    }

    const passwordIsCorrect = await passwordUtils.compare(password, user.passwordHash);

    if (passwordIsCorrect) {
      delete user.passwordHash;
      res.status(HTTP_CODES.OK).json(user);
    } else {
      res.status(HTTP_CODES.UNAUTHORIZED).send(`Password is incorrect`);
    }
  })
};
