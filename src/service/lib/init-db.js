"use strict";

const defineModels = require(`../models`);
const Alias = require(`../models/alias`);

module.exports = async (sequelize, {categories, offers, users}) => {

  const {Category, Offer, User} = defineModels(sequelize);
  await sequelize.sync({force: true});
  const userModels = await User.bulkCreate(users, {include: [Alias.OFFERS, Alias.COMMENTS]});

  const userIdByEmail = userModels.reduce((acc, next) => ({
    [next.email]: next.id,
    ...acc
  }), {});

  offers.forEach((offer) => {
    offer.userId = userIdByEmail[offer.user];
    offer.comments.forEach((comment) => {
      comment.userId = userIdByEmail[comment.user];
    });
  });

  const categoryModels = await Category.bulkCreate(categories.map((item) => ({name: item})));
  const categoryIdByName = categoryModels.reduce((acc, item) => ({
    ...acc,
    [item.name]: item.id,
  }), {});

  const offerPromises = offers.map(async (offer) => {
    const offerModel = await Offer.create(offer, {include: [Alias.COMMENTS]});
    await offerModel.addCategories(offer.categories.map((name) => categoryIdByName[name]));
  });

  await Promise.all(offerPromises);
};
