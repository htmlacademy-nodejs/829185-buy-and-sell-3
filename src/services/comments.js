'use strict';
const {nanoid} = require(`nanoid`);

class CommentsService {

  findAll(offer) {
    return offer.comments;
  }

  create(offer, comment) {
    offer.comments.push({id: nanoid(), ...comment});
    return this.findAll(offer);
  }

  delete(offer, commentId) {
    offer.comments = offer.comments.filter(({id}) => id !== commentId);
  }
}

module.exports = CommentsService;
