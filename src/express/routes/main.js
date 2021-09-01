'use strict';

const {Router} = require(`express`);
const upload = require(`../middlewares/upload`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();
const OFFERS_PER_PAGE = 8;

mainRouter.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page;
  const limit = OFFERS_PER_PAGE;
  const offset = (page - 1) * OFFERS_PER_PAGE;
  const [
    {count, offers},
    categories
  ] = await Promise.all([
    api.getOffers({limit, offset}),
    api.getCategories(true)
  ]);
  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);
  const {user} = req.session;

  res.render(`main`, {proposals: offers, categories, page, totalPages, user});
});
mainRouter.get(`/logout`, (req, res) => {
  delete req.session.user;
  res.redirect(`/`);
});
mainRouter.get(`/search`, async (req, res) => {
  const {user} = req.session;
  try {
    const {search} = req.query;
    const results = await api.search(search);
    res.render(`search-result`, {
      results,
      user
    });
  } catch (error) {
    res.render(`search-result`, {
      user,
      results: []
    });
  }
});
mainRouter.get(`/comments`, async (req, res) => {
  const proposals = await api.getOffers();
  const {user} = req.session;
  const slicedProposals = proposals.slice(0, 3);
  res.render(`comments`, {proposals: slicedProposals, user});
});
mainRouter.get(`/my-tickets`, async (req, res) => {
  const {user} = req.session;
  const proposals = await api.getOffers();
  res.render(`my-tickets`, {proposals, user});
});
mainRouter.get(`/new-ticket`, (req, res) => res.render(`new-ticket.pug`));
mainRouter.get(`/ticket`, (req, res) => res.render(`ticket.pug`));
mainRouter.get(`/ticket-edit`, (req, res) => res.render(`ticket-edit.pug`));
mainRouter.get(`/register`, (req, res) => {
  const {error} = req.query;
  res.render(`sign-up`, {error});
});
mainRouter.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const userData = {
    avatar: file && file.filename,
    name: body[`user-name`],
    email: body[`user-email`],
    password: body[`user-password`],
    passwordRepeated: body[`user-password-again`]
  };
  try {
    await api.createUser(userData);
    res.redirect(`/login`);
  } catch (error) {
    res.redirect(`/register?error=${encodeURIComponent(error.response.data)}`);
  }
});

module.exports = mainRouter;
