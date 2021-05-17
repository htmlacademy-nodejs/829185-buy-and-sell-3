'use strict';

const express = require(`express`);
const app = express();
const path = require(`path`);
const port = 8080;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;
const {
  myRoutes,
  mainRoutes,
  offersRoutes
} = require('./routes');

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));


app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.use((req, res) => res.status(400).render(`errors/404`));
app.use((req, res) => res.status(500).render(`errors/500`));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(port);
