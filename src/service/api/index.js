'use strict';

const {Router} = require(`express`);
const categories = require(`../api/categories`);
const offer = require(`../api/offers`);
const search = require(`../api/search`);

const {
  CategoriesService,
  SearchService,
  OffersService,
  CommentsService,
} = require(`../../services`);

const app = new Router();

const initAPI = (mockData) => {
  categories(app, new CategoriesService(mockData));
  search(app, new SearchService(mockData));
  offer(app, new OffersService(mockData), new CommentsService());

  return app;
};

module.exports = initAPI;
