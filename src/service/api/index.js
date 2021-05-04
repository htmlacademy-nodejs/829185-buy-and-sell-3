'use strict';

const {Router} = require(`express`);
const offers = require(`../api/offers`);
const search = require(`../api/search`);
const categories = require(`../api/categories`);

const {getMocks} = require(`../utils`);

const {
  SearchService,
  CategoriesService,
  OffersService,
  CommentsService
} = require(`../../services`);

const app = new Router();

(async () => {
  const mockData = await getMocks();

  offers(app, new OffersService(mockData), new CommentsService());
  search(app, new SearchService(mockData));
  categories(app, new CategoriesService(mockData));
})();

module.exports = app;
