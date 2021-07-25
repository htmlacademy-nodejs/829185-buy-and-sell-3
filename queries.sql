-- Получить список всех категорий (идентификатор, наименование категории);
SELECT * FROM categories;

-- Получить список категорий для которых создано минимум одно объявление (идентификатор, наименование категории);
SELECT id, name FROM categories JOIN offer_categories ON id = category_id GROUP BY id;

-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории);
SELECT id, name, count(offer_id) FROM categories LEFT JOIN offer_categories ON id = category_id GROUP BY id

/*
 Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления,
 дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие объявления;
*/
SELECT offers.*,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
  users.first_name,
  users.last_name,
  users.email
FROM offers
  JOIN offer_categories ON offers.id = offer_categories.offer_id
  JOIN categories ON offer_categories.category_id = categories.id
  LEFT JOIN comments ON comments.offer_id = offers.id
  JOIN users ON users.id = offers.user_id
  GROUP BY offers.id, users.id
  ORDER BY offers.created_at DESC
/*
 Получить полную информацию определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления,
 текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
*/
SELECT offers.*,
  COUNT(comments.id) AS comments_count,
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
  users.first_name,
  users.last_name,
  users.email
FROM offers
  JOIN offer_categories ON offers.id = offer_categories.offer_id
  JOIN categories ON offer_categories.category_id = categories.id
  LEFT JOIN comments ON comments.offer_id = offers.id
  JOIN users ON users.id = offers.user_id
WHERE offers.id = 1
  GROUP BY offers.id, users.id

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT
  comments.id,
  comments.offer_id,
  users.first_name,
  users.last_name,
  comments.text
FROM comments
  JOIN users ON comments.user_id = users.id
  ORDER BY comments.created_at DESC
  LIMIT 5

-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
  comments.id,
  comments.offer_id,
  users.first_name,
  users.last_name,
  comments.text
FROM comments
  JOIN users ON comments.user_id = users.id
WHERE comments.offer_id = 1
  ORDER BY comments.created_at DESC

-- Выбрать 2 объявления, соответствующих типу «куплю»;
SELECT * FROM offers
WHERE type = 'offer'
  LIMIT 2

-- Обновить заголовок определённого объявления на «Уникальное предложение!»;
UPDATE offers
SET title = 'Уникальное предложение!'
WHERE id = 1
