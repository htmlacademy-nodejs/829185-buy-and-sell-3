'use strict';
const axios = require(`axios`);
const TIMEOUT = 1000;
const {DEFAULT_API_PORT} = require(`../constants`);

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

  getOffers({comments} = {}) {
    return this._load(`/offers`, {params: {comments}});
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
      method: `POST`,
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
