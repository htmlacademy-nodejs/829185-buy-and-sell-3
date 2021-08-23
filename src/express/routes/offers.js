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

offersRouter.get(`/category/:id`, (req, res) => res.send(`/category/:id ${req.params.id}`));
offersRouter.post(`/add`,
    upload.single(`avatar`),
    async (req, res) => {

      const {body, file} = req;
      const offerData = {
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
offersRouter.get(`/add`, async (req, res) => {
  const {error} = req.query;
  const categories = await api.getCategories();
  res.render(`new-ticket`, {categories, error});
});
offersRouter.get(`/edit/:offerId`, async (req, res) => {
  const {offerId} = req.params;
  const {error} = req.query;

  const [proposal, categories] = await Promise.all([
    await api.getOffer(offerId),
    await api.getCategories(),
  ]);

  res.render(`ticket-edit`, {proposal, categories, error});
});
offersRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const {error} = req.query;
  const proposal = await api.getOffer(id, true);

  res.render(`ticket`, {proposal, error});
});
offersRouter.post(`/:id/comments`, async (req, res) => {
  const {id} = req.params;
  const {comment} = req.body;

  try {
    await api.createComment(id, {name: comment});
    res.redirect(`/offers/${id}`);
  } catch (error) {
    res.redirect(`/offers/${id}?error=${encodeURIComponent(error.response.data)}`);
  }
});


module.exports = offersRouter;
