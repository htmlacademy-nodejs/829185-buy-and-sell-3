'use strict';

const {readFile} = require(`fs/promises`);

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getRandomInt = (min = 0, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getPictureFileName = (count) => `item${count < 10 ? `0${count}` : count}.jpg`;

const correctNounEnding = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const units = 4;
  const doubles = 20;
  const otherCases = 5;
  const lastTitleIndex = 2;
  let titleIndex;

  if (number % 100 > units && number % 100 < doubles) {
    titleIndex = lastTitleIndex;
  } else {
    titleIndex = cases[(number % 10 < otherCases) ? number % 10 : otherCases];
  }

  return titles[titleIndex];
};

const getMocks = async () => {
  const FILENAME = `mocks.json`;
  try {
    const fileContent = await readFile(FILENAME);
    return JSON.parse(fileContent);
  } catch (err) {
    return console.error(`Something went wrong ${err}`);
  }
};

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  let result = [];
  while (count--) {
    result.push(
      ...items.splice(
        getRandomInt(0, items.length - 1), 1
      )
    );
  }
  return result;
};

module.exports = {
  shuffle,
  getRandomInt,
  getPictureFileName,
  correctNounEnding,
  getMocks,
  getRandomSubarray
};
