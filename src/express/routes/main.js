const {Router} = require(`express`);
const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const proposals = await api.getOffers();
  res.render(`main`, {proposals});
});
mainRouter.get(`/login`, (req, res) => res.render(`login.pug`));
mainRouter.get(`/search`, async (req, res) => {
  console.log(req.query.q);
  res.render(`search-result.pug`)
});
mainRouter.get(`/comments`, (req, res) => res.render(`comments.pug`));
mainRouter.get(`/my-tickets`, (req, res) => res.render(`my-tickets.pug`));
mainRouter.get(`/new-ticket`, (req, res) => res.render(`new-ticket.pug`));
mainRouter.get(`/sign-up`, (req, res) => res.render(`sign-up.pug`));
mainRouter.get(`/ticket`, (req, res) => res.render(`ticket.pug`));
mainRouter.get(`/ticket-edit`, (req, res) => res.render(`ticket-edit.pug`));

module.exports = mainRouter;
