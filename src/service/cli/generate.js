'use strict';

const {
  DEFAULT_COUNT,
  OFFER_TYPES,
  SUM_RESTRICTIONS,
  PIC_RESTRICTIONS,
  MOCKS_RESTRICTIONS
} = require(`../mocks`);

const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  correctNounEnding
} = require(`../utils`);

const {writeFile, readFile} = require(`fs/promises`);

const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await readFile(filePath, `utf8`);
    return content.split(`\n`).filter(line => line.trim().length > 0);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    type: OFFER_TYPES[Object.keys(OFFER_TYPES)[Math.floor(Math.random() * Object.keys(OFFER_TYPES).length)]],
    title: titles[getRandomInt(0, titles.length - 1)],
    description: shuffle(sentences).slice(1, 5).join(` `),
    sum: getRandomInt(SUM_RESTRICTIONS.MIN, SUM_RESTRICTIONS.MAX),
    picture: getPictureFileName(getRandomInt(PIC_RESTRICTIONS.MIN, PIC_RESTRICTIONS.MAX)),
    category: [categories[getRandomInt(0, categories.length - 1)]]
  })
  ));

module.exports = {
  name: `--generate`,
  async run(args) {

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    if (countOffer > MOCKS_RESTRICTIONS.MAX) {
      console.error(chalk.red(`Не больше ${MOCKS_RESTRICTIONS.MAX} ${correctNounEnding(MOCKS_RESTRICTIONS.MAX, [`объявление`, `объявления`, `объявлений`])}`));
    } else {
      const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

      try {
        await writeFile(FILE_NAME, content);
      } catch (e) {
        return console.error(chalk.red(`Can't write data to file... Something went wrong: ${e.message}`));
      }
    }

    return console.info(chalk.green(`Operation success. File created.`));
  }
};
