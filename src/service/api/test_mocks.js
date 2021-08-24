'use strict';

const {getRandomInt} = require(`../utils`);

const mockCategories = [
  {id: 1, name: `Животные`},
  {id: 2, name: `Журналы`},
  {id: 3, name: `Игры`},
  {id: 4, name: `Разное`},
  {id: 5, name: `Посуда`},
  {id: 6, name: `Книги`},
  {id: 7, name: `Нотальные карты`},
  {id: 8, name: `Я у мамы перекуп`},
  {id: 9, name: `Космос`},
  {id: 10, name: `Крестраж`},
  {id: 11, name: `Какая то хрень`},
  {id: 12, name: `Криминал`},
];

const users = [
  {
    name: `Иван Иванов`,
    email: `ivanov@example.com`,
    passwordHash: `ivanov`,
    avatar: `avatar01.jpg`
  },
  {
    name: `Пётр Петров`,
    email: `petrov@example.com`,
    passwordHash: `petrov`,
    avatar: `avatar02.jpg`
  }
];

const mockOffers = [
  {
    "user": users[getRandomInt(0, users.length - 1)].email,
    "categories": [mockCategories[1].name, mockCategories[4].name],
    "description": `Даю недельную гарантию. Кажется, что это хрупкая вещь. Не пытайтесь торговаться. Цену вещам я знаю Кому нужен этот новый телефон, если тут такое...`,
    "picture": `item16.jpg`,
    "title": `Куплю породистого кота.`,
    "type": `offer`,
    "sum": 5102,
    "comments": [
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Почему в таком ужасном состоянии? Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Неплохо, но дорого. Совсем немного... Почему в таком ужасном состоянии? А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. А где блок питания? Оплата наличными или перевод на карту?`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Продаю в связи с переездом. Отрываю от сердца. А где блок питания? Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво?`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Почему в таком ужасном состоянии? А сколько игр в комплекте? Совсем немного... Вы что?! В магазине дешевле.`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `С чем связана продажа? Почему так дешёво? Неплохо, но дорого. Продаю в связи с переездом. Отрываю от сердца. А где блок питания? А сколько игр в комплекте? Совсем немного... Вы что?! В магазине дешевле. Почему в таком ужасном состоянии?`
      }
    ]
  },
  {
    "user": users[getRandomInt(0, users.length - 1)].email,
    "categories": [mockCategories[3].name],
    "description": `Если товар не понравится — верну всё до последней копейки. Эти часы мне подарил отец, их привёз его друг, они воевали во вьетнаме вместе... Всю историю расскажу при встрече. Даю гарантию, что после покупки вы меня не найдёте. Это настоящая находка для коллекционера!`,
    "picture": `item06.jpg`,
    "title": `ip`,
    "type": `sale`,
    "sum": 25806,
    "comments": [
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Оплата наличными или перевод на карту? Совсем немного... Вы что?! В магазине дешевле. Неплохо, но дорого. Почему в таком ужасном состоянии? С чем связана продажа? Почему так дешёво? А где блок питания?`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого. Почему в таком ужасном состоянии?`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Вы что?! В магазине дешевле. А сколько игр в комплекте? С чем связана продажа? Почему так дешёво?`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `С чем связана продажа? Почему так дешёво? Совсем немного... А сколько игр в комплекте? Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле. Оплата наличными или перевод на карту? Неплохо, но дорого.`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца. А где блок питания?`
      }
    ]
  },
  {
    "user": users[getRandomInt(0, users.length - 1)].email,
    "categories": [mockCategories[4].name, mockCategories[9].name],
    "description": `Если найдёте дешевле — сброшу цену. Это не воровованное, за это просто не заплатили. Даю недельную гарантию. Товар в отличном состоянии.`,
    "picture": `item06.jpg`,
    "title": `Куплю детские санки.`,
    "type": `offer`,
    "sum": 27938,
    "comments": [
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `А где блок питания? С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? Неплохо, но дорого. Оплата наличными или перевод на карту?`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `А сколько игр в комплекте? А где блок питания? С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. Вы что?! В магазине дешевле.`
      },
      {
        "user": users[getRandomInt(0, users.length - 1)].email,
        "name": `Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?`
      }
    ]
  }
];

const newValidOffer = {
  "user": users[getRandomInt(0, users.length - 1)].email,
  "categories": [mockCategories[1].id, mockCategories[2].id],
  "description": `Мой дед не мог её сломать. Даю гарантию, что после покупки вы меня не найдёте. Если найдёте дешевле — сброшу цену. Кажется, что это хрупкая вещь.`,
  "picture": `item06.jpg`,
  "title": `Продам отличную подборку фильмов на VHS.`,
  "type": `offer`,
  "sum": 96624
};

const notExistingOffer = {
  "id": `not_existing_id`,
  "categories": [mockCategories[1].name],
  "description": `Мой дед не мог её сломать. Даю гарантию, что после покупки вы меня не найдёте. Если найдёте дешевле — сброшу цену. Кажется, что это хрупкая вещь.`,
  "picture": `item06.jpg`,
  "title": `Продам отличную подборку фильмов на VHS.`,
  "type": `offer`,
  "sum": 96624,
  "comments": []
};

const newInvalidOffer = {
  "user": users[getRandomInt(0, users.length - 1)].email,
  "picture": `item06.jpg`,
  "title": `Продам отличную подборку фильмов на VHS.`,
  "description": ``,
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
  "user": users[getRandomInt(0, users.length - 1)].email,
  "name": `Очень смешной новый комментарий`
};

const invalidNewComment = {
  "text": `Очень не смешной новый комментарий`
};

const validUser = {
  name: `Сидор Сидоров`,
  email: `sidorov@example.com`,
  password: `sidorov`,
  passwordRepeated: `sidorov`,
  avatar: `sidorov.jpg`
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
  mockCategories,
  users,
  validUser
};
