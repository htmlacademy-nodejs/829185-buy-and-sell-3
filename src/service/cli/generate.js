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

const {
  getRandomInt,
  shuffle,
  getPictureFileName,
  declOfNum
} = require(`../utils`);

const fs = require(`fs`);

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
  run(args) {

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MOCKS_RESTRICTIONS.MAX) {
      console.info(`Не больше ${MOCKS_RESTRICTIONS.MAX} ${declOfNum(MOCKS_RESTRICTIONS.MAX, [`объявление`, `объявления`, `объявлений`])}`);
    } else {
      const content = JSON.stringify(generateOffers(countOffer));

      fs.writeFile(FILE_NAME, content, (err) => {
        if (err) {
          return console.error(`Can't write data to file...`);
        }

        return console.info(`Operation success. File created.`);
      });
    }
  }
};
