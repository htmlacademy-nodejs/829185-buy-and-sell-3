'use strict';

const {
  DEFAULT_COUNT,
  TITLES,
  DESCRIPTIONS,
  CATEGORIES,
  OFFER_TYPES,
  SUM_RESTRICTIONS,
  PIC_RESTRICTIONS
} = require(`../mocks`);

const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  correctNounEnding
} = require(`../utils`);

const {writeFile} = require(`fs/promises`);

const MOCKS_RESTRICTIONS = {
  MIN: 1,
  MAX: 1000
};

const FILE_NAME = `mocks.json`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    type: OFFER_TYPES[Object.keys(OFFER_TYPES)[Math.floor(Math.random() * Object.keys(OFFER_TYPES).length)]],
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    description: shuffle(DESCRIPTIONS).slice(1, 5).join(` `),
    sum: getRandomInt(SUM_RESTRICTIONS.MIN, SUM_RESTRICTIONS.MAX),
    picture: getPictureFileName(getRandomInt(PIC_RESTRICTIONS.MIN, PIC_RESTRICTIONS.MAX)),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]]
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MOCKS_RESTRICTIONS.MAX) {
      console.error(chalk.red(`Не больше ${MOCKS_RESTRICTIONS.MAX} ${correctNounEnding(MOCKS_RESTRICTIONS.MAX, [`объявление`, `объявления`, `объявлений`])}`));
    } else {
      const content = JSON.stringify(generateOffers(countOffer));

      try {
        await writeFile(FILE_NAME, content);
      } catch (e) {
        return console.error(chalk.red(`Can't write data to file... Something went wrong: ${e.message}`));
      }
    }

    return console.info(chalk.green(`Operation success. File created.`));
  }
};
