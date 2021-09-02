'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const api = require(`../api`).getAPI();
const {nanoid} = require(`nanoid`);
const path = require(`path`);
const UPLOAD_DIR = `../upload/img/`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);
const multer = require(`multer`);
const {makeArray} = require(`../../service/utils`);
const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});
const upload = multer({storage});
const auth = require(`../middlewares/auth`);
const csrf = require(`csurf`);
const csrfProtection = csrf();

offersRouter.get(`/category/:id`, (req, res) => res.send(`/category/:id ${req.params.id}`));
offersRouter.post(`/add`,
    auth,
    upload.single(`avatar`),
    csrfProtection,
    async (req, res) => {
      const {user} = req.session;
      const {body, file} = req;
      const offerData = {
        userId: user.id,
        picture: file && file.filename || ``,
        sum: body.price,
        type: body.action,
        description: body.comment,
        title: body[`ticket-name`],
        categories: makeArray(body.category)
      };

      try {
        await api.createOffer(offerData);
        res.redirect(`/my`);
      } catch (error) {
        res.redirect(`/offers/add?error=${encodeURIComponent(error.response.data)}`);
      }
    });
offersRouter.get(`/add`, auth, csrfProtection, async (req, res) => {
  const {error} = req.query;
  const {user} = req.session;
  const categories = await api.getCategories();
  res.render(`new-ticket`, {categories, error, user, csrfToken: req.csrfToken()});
});
offersRouter.get(`/edit/:offerId`, auth, async (req, res) => {
  const {offerId} = req.params;
  const {user} = req.session;
  const {error} = req.query;

  const [proposal, categories] = await Promise.all([
    await api.getOffer(offerId),
    await api.getCategories(),
  ]);

  res.render(`ticket-edit`, {proposal, categories, error, user});
});
offersRouter.post(`/edit/:offerId`, auth, upload.single(`avatar`), csrfProtection, async (req, res) => {
  const {user} = req.session;
  const {body, file} = req;
  const {id} = req.params;
  const offerData = {
    picture: file ? file.filename : body[`old-image`],
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    categories: makeArray(body.category),
    userId: user.id
  };
  try {
    await api.editOffer(id, offerData);
    res.redirect(`/my`);
  } catch (error) {
    res.render(`ticket-edit?error=${encodeURIComponent(error.response.data)}`);
  }
});
offersRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;
  const proposal = await api.getOffer(id, true);
  const {user} = req.session;

  res.render(`ticket`, {proposal, error, user});
});
offersRouter.post(`/:id/comments`, auth, csrfProtection, async (req, res) => {
  const {id} = req.params;
  const {comment} = req.body;
  const {user} = req.session;

  try {
    await api.createComment(id, {userId: user.id, name: comment});
    res.redirect(`/offers/${id}`);
  } catch (error) {
    res.redirect(`/offers/${id}?error=${encodeURIComponent(error.response.data)}`);
  }
});

module.exports = offersRouter;
