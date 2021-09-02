'use strict';

const {Router} = require(`express`);
const loginRouter = new Router();
const api = require(`../api`).getAPI();

loginRouter.get(`/`, (req, res) => {
  const {error} = req.query;
  res.render(`login`, {error});
});
loginRouter.post(`/`, async (req, res) => {
  try {
    const user = await api.auth(req.body[`user-email`], req.body[`user-password`]);
    req.session.user = user;
    res.redirect(`/`);
  } catch (error) {
    res.redirect(`/login?error=${encodeURIComponent(error.response.data)}`);
  }
});

module.exports = loginRouter;
