'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();
const OFFERS_PER_PAGE = 8;

mainRouter.get(`/`, async (req, res) => {
  // получаем номер страницы
  let {page = 1} = req.query;
  page = +page;

  // количество запрашиваемых объявлений равно количеству объявлений на странице
  const limit = OFFERS_PER_PAGE;

  // количество объявлений, которое нам нужно пропустить - это количество объявлений на предыдущих страницах
  const offset = (page - 1) * OFFERS_PER_PAGE;
  const [
    {count, offers},
    categories
  ] = await Promise.all([
    api.getOffers({limit, offset}),
    api.getCategories(true)
  ]);

  // количество страниц — это общее количество объявлений, поделённое на количество объявлений на странице (с округлением вверх)
  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

  // передадим все эти данные в шаблон
  res.render(`main`, {proposals: offers, categories, page, totalPages});
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
