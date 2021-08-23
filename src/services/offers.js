"use strict";

const Alias = require(`../service/models/alias`);

class OfferService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
    this._User = sequelize.models.User;
  }

  async create(offerData) {
    const offer = await this._Offer.create(offerData);
    await offer.addCategories(offerData.categories);
    return offer.get();
  }

  async drop(id) {
    const deletedRows = await this._Offer.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  async findAll(needComments) {

    const include = [
      Alias.CATEGORIES,
      {
        model: this._User,
        as: Alias.USER,
        attributes: {
          exclude: [`passwordHash`]
        }
      }
    ];

    if (needComments) {
      include.push({
        model: this._Comment,
        as: Alias.COMMENTS,
        include: [
          {
            model: this._User,
            as: Alias.USER,
            attributes: {
              exclude: [`passwordHash`]
            }
          }
        ]
      });
    }
    const offers = await this._Offer.findAll({include});
    return offers.map((item) => item.get());
  }

  findOne(id) {
    return this._Offer.findByPk(id, {include: [
      Alias.CATEGORIES,
      {
        model: this._User,
        as: Alias.USER,
        attributes: {
          exclude: [`passwordHash`]
        }
      }
    ]});
  }

  async update(id, offer) {
    const [affectedRows] = await this._Offer.update(offer, {
      where: {id}
    });
    return !!affectedRows;
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Offer.findAndCountAll({
      limit,
      offset,
      include: [Alias.CATEGORIES],
      distinct: true
    });
    return {count, offers: rows};
  }
}

module.exports = OfferService;
