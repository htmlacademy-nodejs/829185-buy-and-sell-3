'use strict';
const axios = require(`axios`);
const TIMEOUT = 1000;
const {DEFAULT_API_PORT, HTTP_METHODS} = require(`../constants`);

class API {

  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getOffers({offset, limit, comments} = {offset: 0, limit: 0, comments: false}) {
    return this._load(`/offers`, {params: {offset, limit, comments}});
  }

  getOffer(id) {
    return this._load(`/offers/${id}`);
  }

  search(search) {
    return this._load(`/search`, {params: {search}});
  }

  getCategories(count) {
    return this._load(`/categories`, {params: {count}});
  }

  async createOffer(data) {

    return this._load(`/offers`, {
      method: HTTP_METHODS.POST,
      data
    });
  }

  editOffer(id, data) {
    return this._load(`/offers/${id}`, {
      method: HTTP_METHODS.PUT,
      data
    });
  }
  createComment(id, data) {
    return this._load(`/offers/${id}/comments`, {
      method: HTTP_METHODS.POST,
      data
    });
  }
}

const port = process.env.API_PORT || DEFAULT_API_PORT;
const defaultUrl = `http://localhost:${port}/api/`;

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};
