'use strict';
const {nanoid} = require(`nanoid`);

class OffersService {
  constructor(offers) {
    this.offers = offers || [];
  }

  findAll() {
    return this.offers;
  }

  findOne(offerId) {
    return this.offers.find(({id}) => id === offerId);
  }

  create(offer) {
    offer.id = nanoid();
    this.offers.push(offer);
    return offer;
  }

  update(id, offerAttr) {
    Object.assign(this.findOne(id), offerAttr);
    return this.findOne(id);
  }

  delete(id) {
    this.offers.splice(this.offers.indexOf(this.findOne(id)), 1);
  }
}

module.exports = OffersService;
