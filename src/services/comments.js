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
    const comments = offer.comments;
    comments.splice(comments.indexOf(comments.find(({id}) => id === commentId)), 1);
  }
}

module.exports = CommentsService;
