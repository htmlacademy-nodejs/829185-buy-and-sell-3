'use strict';

class CategoriesService {
  constructor(offers) {
    this.offers = offers;
  }

  findAll() {
    let categories = [];
    this.offers.forEach((item) => item.category.length && item.category.forEach((category) => !categories.includes(category) && categories.push(category)));
    return categories;
  }

}

module.exports = CategoriesService;
