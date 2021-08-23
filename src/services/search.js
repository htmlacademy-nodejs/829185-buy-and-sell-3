"use strict";

const {Op} = require(`sequelize`);
const Alias = require(`../service/models/alias`);

class SearchService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._User = sequelize.models.User;
  }

  async findAll(searchText) {

    const offers = await this._Offer.findAll({
      where: {
        title: {
          [Op.substring]: searchText
        }
      },
      include: [
        Alias.CATEGORIES,
        {
          model: this._User,
          as: Alias.USER,
          attributes: {
            exclude: [`passwordHash`]
          }
        }
      ],
    });

    return offers.map((offer) => offer.get());
  }

}

module.exports = SearchService;
