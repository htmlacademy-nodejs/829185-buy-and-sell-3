'use strict';

const express = require(`express`);
const app = express();
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);
const path = require(`path`);
const port = 8080;
const PUBLIC_DIR = `public`;

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.get(`/`, (req, res) => res.render(`main.pug`));
app.get(`/login`, (req, res) => res.render(`login.pug`));
app.get(`/search`, (req, res) => res.render(`search-result.pug`));
app.get(`/comments`, (req, res) => res.render(`comments.pug`));
app.get(`/my-tickets`, (req, res) => res.render(`my-tickets.pug`));
app.get(`/new-ticket`, (req, res) => res.render(`new-ticket.pug`));
app.get(`/sign-up`, (req, res) => res.render(`sign-up.pug`));
app.get(`/ticket`, (req, res) => res.render(`ticket.pug`));
app.get(`/ticket-edit`, (req, res) => res.render(`ticket-edit.pug`));

app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

app.use((req, res) => res.status(400).render(`errors/404`));
app.use((err, req, res, next) => {
  res.status(500).render(`errors/500`);
  next();
});

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(port);
