PRAGMA foreign_keys = ON;

CREATE TABLE ads (
id INTEGER PRIMARY KEY NOT NULL,
title VARCHAR(100) NOT NULL,
description TEXT,
owner VARCHAR(100),
price INT NOT NULL,
createdAt DATE NOT NULL,
picture BLOB,
location VARCHAR(100),
imgUrl VARCHAR(500),
category_id INT,
 FOREIGN KEY (category_id) REFERENCES categories(id)
);



CREATE TABLE categories (
id INTEGER PRIMARY KEY NOT NULL,
name VARCHAR(100) NOT NULL
);






INSERT INTO Ad (title) VALUES ("SuperBike"), ("Super car");

INSERT INTO categories (name) VALUES ("clothe"), ("car");

SELECT * FROM ads INNER JOIN categories  ON categories.id = ads.categoriesId WHERE name LIKE "veh%";

DELETE FROM Ad where id=1;

UPDATE Ad SET title = 'super truck' WHERE id = 2;

CREATE TABLE Ad (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR(100) NOT NULL
);

DROP TABLE ads;

drop DATABASE tgc.sqlite;


PRAGMA foreign_keys = ON;

SELECT Ad.*, categories.name FROM Ad LEFT JOIN categories ON categories.id = Ad.category_id