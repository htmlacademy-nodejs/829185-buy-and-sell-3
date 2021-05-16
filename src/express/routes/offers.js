'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const api = require(`../api`).getAPI();
const {nanoid} = require(`nanoid`);
const path = require(`path`);
const UPLOAD_DIR = `../upload/img/`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);
const multer = require('multer');

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
      picture: file.filename,
      sum: body.sum,
      type: body.action,
      description: body.comment,
      title: body.title,
      category: body.category
    };
    try {
      await api.createOffer(offerData);
      res.redirect(`/my`);
    } catch (e) {
      res.redirect(`back`);
    }
  });
offersRouter.get(`/edit/:offerId`, async (req, res) => {
  const {offerId} = req.params
  const proposal = await api.getOffer(offerId);
  const categories = await api.getCategories();

  res.render(`ticket-edit`, {proposal, categories});
});
offersRouter.get(`/:id`, (req, res) => res.send(`/offers/:id ${req.params.id}`));

module.exports = offersRouter;
