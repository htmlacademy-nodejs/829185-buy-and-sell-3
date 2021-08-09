'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const api = require(`../api`).getAPI();

myRouter.get(`/`, async (req, res) => {
  const proposals = await api.getOffers();

  res.render(`my-tickets`, {proposals});
});
myRouter.get(`/comments`, async (req, res) => {
  let proposals = await api.getOffers({comments: true});
  proposals = proposals.filter(({comments}) => comments.length);
  res.render(`comments`, {proposals: proposals.slice(0, 3)});
});

module.exports = myRouter;
