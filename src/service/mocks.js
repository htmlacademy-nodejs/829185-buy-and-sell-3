'use strict';

const DEFAULT_COUNT = 1;
const OFFER_TYPES = [`offer`, `sale`];
const SUM_RESTRICTIONS = {
  MIN: 100,
  MAX: 100000
};
const PIC_RESTRICTIONS = {
  MIN: 1,
  MAX: 16
};
const MOCKS_RESTRICTIONS = {
  MIN: 1,
  MAX: 1000
};

module.exports = {
  DEFAULT_COUNT,
  OFFER_TYPES,
  SUM_RESTRICTIONS,
  PIC_RESTRICTIONS,
  MOCKS_RESTRICTIONS
};
