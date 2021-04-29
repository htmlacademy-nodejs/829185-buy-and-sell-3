'use strict';
const {nanoid} = require(`nanoid`);

class MocksService {
  constructor(offers) {
    this.offers = offers || [];
  }

  getAll() {
    return this.offers;
  }

  getById(filteredId) {
    if (!this.isIdInList(filteredId)) {
      console.error(`No such ${filteredId} in offers list`);
      return false;
    } else {
      return this.offers.find(({id}) => id === filteredId);
    }
  }

  getCategories() {
    let categories = [];
    this.offers.forEach((item) => item.category.length && item.category.forEach((category) => !categories.includes(category) && categories.push(category)));
    return categories;
  }

  create(offer) {
    this.offers.push(offer);
  }

  change(id, offerAttr) {
    Object.assign(this.getById(id), offerAttr);
  }

  delete(id) {
    const item = this.getById(id);
    if (item) {
      this.offers.splice(this.offers.indexOf(item), 1);
    }
  }

  isIdInList(id) {
    let currentList = this.offers.map(({id}) => id) || [];
    return currentList.includes(id);
  }

  commentsByItemId(id) {
    const item = this.getById(id);
    if (item) {
      return item.comments || [];
    }
  }

  deleteCommentById(id, commentId) {
    let item = this.getById(id)
    if (item.comments.find(({id}) => id === commentId)) {
      item.comments.splice(item.comments.indexOf(item.comments.find(({id}) => id === commentId), 1));
      return true;
    }
    console.error(`No such comment id: [${commentId}] in comments list for offer: [${id}]`);
    return false;
  }

  addCommentsByItemId(id, comment) {
    const item = this.getById(id);
    if (item) {
      const id = nanoid();
      item.comments.push({id, text: comment.text});
    }
  }
}

module.exports = MocksService;
