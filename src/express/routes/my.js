'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const api = require(`../api`).getAPI();
const auth = require(`../middlewares/auth`);

myRouter.get(`/`, auth, async (req, res) => {
  const proposals = await api.getOffers();
  const {user} = req.session;
  res.render(`my-tickets`, {proposals, user});
});
myRouter.get(`/comments`, auth, async (req, res) => {
  let proposals = await api.getOffers({comments: true});
  proposals = proposals.filter(({comments}) => comments.length);
  const {user} = req.session;
  res.render(`comments`, {proposals: proposals.slice(0, 3), user});
});

module.exports = myRouter;
