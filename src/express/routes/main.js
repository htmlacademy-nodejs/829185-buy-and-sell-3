'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const [
    offers,
    categories
  ] = await Promise.all([
    api.getOffers(),
    api.getCategories(true)
  ]);

  res.render(`main`, {proposals: offers, categories});
});
mainRouter.get(`/login`, (req, res) => res.render(`login.pug`));
mainRouter.get(`/search`, async (req, res) => {

  try {
    const {search} = req.query;
    const results = await api.search(search);
    res.render(`search-result`, {
      results
    });
  } catch (error) {
    res.render(`search-result`, {
      results: []
    });
  }
});
mainRouter.get(`/comments`, async (req, res) => {
  const proposals = await api.getOffers();
  const slicedProposals = proposals.slice(0, 3);
  res.render(`comments`, {proposals: slicedProposals});
});
mainRouter.get(`/my-tickets`, async (req, res) => {
  const proposals = await api.getOffers();
  res.render(`my-tickets`, {proposals});
});
mainRouter.get(`/new-ticket`, (req, res) => res.render(`new-ticket.pug`));
mainRouter.get(`/sign-up`, (req, res) => res.render(`sign-up.pug`));
mainRouter.get(`/ticket`, (req, res) => res.render(`ticket.pug`));
mainRouter.get(`/ticket-edit`, (req, res) => res.render(`ticket-edit.pug`));

module.exports = mainRouter;
