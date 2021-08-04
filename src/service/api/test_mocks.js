'use strict';

const mockOffers = [
  {
    "categories": [
      `Посуда`
    ],
    "description": `Даю недельную гарантию. Кажется, что это хрупкая вещь. Не пытайтесь торговаться. Цену вещам я знаю Кому нужен этот новый телефон, если тут такое...`,
    "picture": `item16.jpg`,
    "title": `Куплю породистого кота.`,
    "type": `offer`,
    "sum": 5102,
    "comments": [
      {
        "name": `Почему в таком ужасном состоянии? Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.`
      },
      {
        "name": `Неплохо, но дорого. Совсем немного... Почему в таком ужасном состоянии? А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. А где блок питания? Оплата наличными или перевод на карту?`
      },
      {
        "name": `Продаю в связи с переездом. Отрываю от сердца. А где блок питания? Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво?`
      },
      {
        "name": `Почему в таком ужасном состоянии? А сколько игр в комплекте? Совсем немного... Вы что?! В магазине дешевле.`
      },
      {
        "name": `Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?`
      },
      {
        "name": `С чем связана продажа? Почему так дешёво? Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца. А где блок питания? А сколько игр в комплекте? Совсем немного... Вы что?! В магазине дешевле. Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "categories": [
      `Животные`
    ],
    "description": `Если товар не понравится — верну всё до последней копейки. Эти часы мне подарил отец, их привёз его друг, они воевали во вьетнаме вместе... Всю историю расскажу при встрече. Даю гарантию, что после покупки вы меня не найдёте. Это настоящая находка для коллекционера!`,
    "picture": `item06.jpg`,
    "title": `Наведу порчу по ip.`,
    "type": `sale`,
    "sum": 25806,
    "comments": [
      {
        "name": `Оплата наличными или перевод на карту? Совсем немного... Вы что?! В магазине дешевле. Неплохо, но дорого. Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво? А где блок питания?`
      },
      {
        "name": `Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого. Почему в таком ужасном состоянии?`
      },
      {
        "name": `Вы что?! В магазине дешевле. А сколько игр в комплекте? С чем связана продажа? Почему так дешёво?`
      },
      {
        "name": `С чем связана продажа? Почему так дешёво? Совсем немного... А сколько игр в комплекте? Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. Оплата наличными или перевод на карту? Неплохо, но дорого.`
      },
      {
        "name": `Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца. А где блок питания?`
      }
    ]
  },
  {
    "categories": [
      `Нотальные карты`
    ],
    "description": `Если найдёте дешевле — сброшу цену. Это не воровованное, за это просто не заплатили. Даю недельную гарантию. Товар в отличном состоянии.`,
    "picture": `item06.jpg`,
    "title": `Куплю детские санки.`,
    "type": `offer`,
    "sum": 27938,
    "comments": [
      {
        "name": `А где блок питания? С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? Неплохо, но дорого. Оплата наличными или перевод на карту?`
      },
      {
        "name": `А сколько игр в комплекте? А где блок питания? С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      },
      {
        "name": `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?`
      }
    ]
  }
];

const mockCategories = [
  `Животные`,
  `Журналы`,
  `Игры`
];

const newValidOffer = {
  "categories": [
    `Я у мамы перекуп`
  ],
  "description": `Мой дед не мог её сломать. Даю гарантию, что после покупки вы меня не найдёте. Если найдёте дешевле — сброшу цену. Кажется, что это хрупкая вещь.`,
  "picture": `item06.jpg`,
  "title": `Продам отличную подборку фильмов на VHS.`,
  "type": `offer`,
  "sum": 96624,
  "comments": []
};

const notExistingOffer = {
  "id": `not_existing_id`,
  "categories": [
    `Я у мамы перекуп`
  ],
  "description": `Мой дед не мог её сломать. Даю гарантию, что после покупки вы меня не найдёте. Если найдёте дешевле — сброшу цену. Кажется, что это хрупкая вещь.`,
  "picture": `item06.jpg`,
  "title": `Продам отличную подборку фильмов на VHS.`,
  "type": `offer`,
  "sum": 96624,
  "comments": []
};

const newInvalidOffer = {
  "picture": `item06.jpg`,
  "title": `Продам отличную подборку фильмов на VHS.`,
  "type": `offer`,
  "sum": 96624,
  "comments": []
};

const validOfferNewAttr = {
  "title": `Новый продающий заголовок`
};

const inValidOfferNewAttr = {
  "wrong_attr": `wrong_attr_text`
};

const validNewComment = {
  "text": `Очень смешной новый комментарий`
};

const invalidNewComment = {
  "title": `Очень не смешной новый комментарий`
};

module.exports = {
  mockOffers,
  newValidOffer,
  notExistingOffer,
  newInvalidOffer,
  validOfferNewAttr,
  inValidOfferNewAttr,
  validNewComment,
  invalidNewComment,
  mockCategories
};
