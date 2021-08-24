'use strict';

const sequelize = require(`../lib/sequelize`);
const {getLogger} = require(`../../logger/logger`);
const initDB = require(`../lib/init-db`);
const {readFile} = require(`fs/promises`);
const chalk = require(`chalk`);
const {
  DEFAULT_COUNT,
  OFFER_TYPES,
  SUM_RESTRICTIONS,
  PIC_RESTRICTIONS,
  MOCKS_RESTRICTIONS,
  MAXIMUM_COMMENTS
} = require(`../mocks`);
const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  correctNounEnding,
  getRandomSubarray
} = require(`../utils`);
const passwordUtils = require(`../lib/password`);

const logger = getLogger();

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const readContent = async (filePath) => {
  try {
    const content = await readFile(filePath, `utf8`);
    return content.split(`\n`).filter((line) => line.trim().length > 0);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (options) => {
  const {countOffer, titles, categories, sentences, comments, users} = options;
  return Array(countOffer).fill({}).map(() => ({
    user: users[getRandomInt(0, users.length - 1)].email,
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PIC_RESTRICTIONS.MIN, PIC_RESTRICTIONS.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: OFFER_TYPES[Object.keys(OFFER_TYPES)[Math.floor(Math.random() * Object.keys(OFFER_TYPES).length)]],
    sum: getRandomInt(SUM_RESTRICTIONS.MIN, SUM_RESTRICTIONS.MAX),
    categories: getRandomSubarray(categories),
    comments: Array(getRandomInt(1, MAXIMUM_COMMENTS)).fill({}).map(() => ({
      user: users[getRandomInt(0, users.length - 1)].email,
      name: shuffle(comments).slice(0, getRandomInt(0, comments.length - 1)).join(` `)
    }))
  })
  );
};

module.exports = {
  name: `--filldb`,
  async run(args) {
    const [count] = args;

    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const users = [
      {
        name: `Иван Иванов`,
        email: `ivanov@example.com`,
        passwordHash: await passwordUtils.hash(`ivanov`),
        avatar: `avatar01.jpg`
      },
      {
        name: `Пётр Петров`,
        email: `petrov@example.com`,
        passwordHash: await passwordUtils.hash(`petrov`),
        avatar: `avatar02.jpg`
      }
    ];

    if (countOffer > MOCKS_RESTRICTIONS.MAX) {
      console.error(chalk.red(`Не больше ${MOCKS_RESTRICTIONS.MAX} ${correctNounEnding(MOCKS_RESTRICTIONS.MAX, [`объявление`, `объявления`, `объявлений`])}`));
    } else {
      const options = {countOffer, titles, categories, sentences, comments, users};
      const offers = generateOffers(options);

      await initDB(sequelize, {categories, offers, users});
    }

    return console.info(chalk.green(`Operation success. Database is created.`));
  }
};
