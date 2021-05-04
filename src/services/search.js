'use strict';

class SearchService {
  constructor(offers) {
    this.offers = offers || [];
  }

  findAll(searchText) {
    return this.offers.filter(({title}) => title.includes(searchText));
  }

}

module.exports = SearchService;
