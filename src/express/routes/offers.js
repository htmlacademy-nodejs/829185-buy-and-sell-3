'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) => res.send(`/category/:id ${req.params.id}`));
offersRouter.get(`/add`, (req, res) => res.send(`/offers/add`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`/offers/edit/:id ${req.params.id}`));
offersRouter.get(`/:id`, (req, res) => res.send(`/offers/:id ${req.params.id}`));

module.exports = offersRouter;
