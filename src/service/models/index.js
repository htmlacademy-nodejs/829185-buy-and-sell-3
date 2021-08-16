"use strict";

const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineOffer = require(`./offer`);
const Alias = require(`./alias`);
const {Model} = require(`sequelize`);

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Offer = defineOffer(sequelize);

  Offer.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `offerId`});
  Comment.belongsTo(Offer, {foreignKey: `offerId`});

  class OfferCategory extends Model {}
  OfferCategory.init({}, {sequelize});

  Offer.belongsToMany(Category, {through: OfferCategory, as: Alias.CATEGORIES});
  Category.belongsToMany(Offer, {through: OfferCategory, as: Alias.OFFERS});
  Category.hasMany(OfferCategory, {as: Alias.OFFER_CATEGORIES});

  return {Category, Comment, Offer, OfferCategory};
};

module.exports = define;
