'use strict';

const {Router} = require(`express`);
const categories = require(`../api/categories`);
const offer = require(`../api/offers`);
const search = require(`../api/search`);
const user = require(`../api/user`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);

const {
  CategoriesService,
  SearchService,
  OffersService,
  CommentsService,
  UserService
} = require(`../../services`);

const app = new Router();

defineModels(sequelize);

(() => {
  categories(app, new CategoriesService(sequelize));
  search(app, new SearchService(sequelize));
  offer(app, new OffersService(sequelize), new CommentsService(sequelize));
  user(app, new UserService(sequelize));
})();

module.exports = app;
