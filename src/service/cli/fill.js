'use strict';

const {
  DEFAULT_COUNT,
  OFFER_TYPES,
  SUM_RESTRICTIONS,
  PIC_RESTRICTIONS,
  MOCKS_RESTRICTIONS,
  MAXIMUM_COMMENTS
} = require(`../mocks`);

const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  correctNounEnding
} = require(`../utils`);

const {writeFile, readFile} = require(`fs/promises`);

const FILE_NAME = `fill-db.sql`;
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

const generateComments = (count, offerId, userCount, comments) => (
  Array(count).fill({}).map(() => ({
    userId: getRandomInt(1, userCount),
    offerId,
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = ({countOffer, titles, categories, users, sentences, commentSentences}) => (
  Array(countOffer).fill({}).map((_, index) => ({
    category: [getRandomInt(1, categories.length)],
    comments: generateComments(getRandomInt(1, MAXIMUM_COMMENTS), index + 1, users.length, commentSentences),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PIC_RESTRICTIONS.MIN, PIC_RESTRICTIONS.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: OFFER_TYPES[Object.keys(OFFER_TYPES)[Math.floor(Math.random() * Object.keys(OFFER_TYPES).length)]],
    sum: getRandomInt(SUM_RESTRICTIONS.MIN, SUM_RESTRICTIONS.MAX),
    userId: getRandomInt(1, users.length)
  }))
);

const users = [
  {
    email: `ivanov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Иван`,
    lastName: `Иванов`,
    avatar: `avatar1.jpg`
  },
  {
    email: `petrov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Пётр`,
    lastName: `Петров`,
    avatar: `avatar2.jpg`
  }
];

module.exports = {
  name: `--fill`,
  async run(args) {

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const commentSentences = await readContent(FILE_COMMENTS_PATH);

    if (countOffer > MOCKS_RESTRICTIONS.MAX) {
      console.error(chalk.red(`Не больше ${MOCKS_RESTRICTIONS.MAX} ${correctNounEnding(MOCKS_RESTRICTIONS.MAX, [`объявление`, `объявления`, `объявлений`])}`));
    } else {
      const options = {countOffer, titles, categories, users, sentences, commentSentences};
      const offers = generateOffers(options);
      const comments = offers.flatMap((offer) => offer.comments);
      const offerCategories = offers.map((offer, index) => ({offerId: index + 1, categoryId: offer.category[0]}));
      const userValues = users.map(
          ({email, passwordHash, firstName, lastName, avatar}) =>
            `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
      ).join(`,\n`);

      const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

      const offerValues = offers.map(
          ({title, description, type, sum, picture, userId}) =>
            `('${title}', '${description}', '${type}', ${sum}, '${picture}', ${userId})`
      ).join(`,\n`);

      const offerCategoryValues = offerCategories.map(
          ({offerId, categoryId}) =>
            `(${offerId}, ${categoryId})`
      ).join(`,\n`);

      const commentValues = comments.map(
          ({text, userId, offerId}) =>
            `('${text}', ${userId}, ${offerId})`
      ).join(`,\n`);

      const content = `
            INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
            ${userValues};
            INSERT INTO categories(name) VALUES
            ${categoryValues};
            ALTER TABLE offers DISABLE TRIGGER ALL;
            INSERT INTO offers(title, description, type, sum, picture, user_id) VALUES
            ${offerValues};
            ALTER TABLE offers ENABLE TRIGGER ALL;
            ALTER TABLE offer_categories DISABLE TRIGGER ALL;
            INSERT INTO offer_categories(offer_id, category_id) VALUES
            ${offerCategoryValues};
            ALTER TABLE offer_categories ENABLE TRIGGER ALL;
            ALTER TABLE comments DISABLE TRIGGER ALL;
            INSERT INTO COMMENTS(text, user_id, offer_id) VALUES
            ${commentValues};
            ALTER TABLE comments ENABLE TRIGGER ALL;`;

      try {
        await writeFile(FILE_NAME, content);
      } catch (e) {
        return console.error(chalk.red(`Can't write data to file... Something went wrong: ${e.message}`));
      }
    }

    return console.info(chalk.green(`Operation success. File created.`));
  }
};
