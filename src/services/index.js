'use strict';

const SearchService = require(`./search`);
const CategoriesService = require(`./categories`);
const OffersService = require(`./offers`);
const UserService = require(`./user`);
const CommentsService = require(`./comments`);

module.exports = {
  SearchService,
  CategoriesService,
  OffersService,
  CommentsService,
  UserService
};
