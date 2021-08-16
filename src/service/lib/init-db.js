"use strict";

const defineModels = require(`../models`);
const Alias = require(`../models/alias`);

module.exports = async (sequelize, {categories, offers}) => {

  const {Category, Offer} = defineModels(sequelize);
  await sequelize.sync({force: true});

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
