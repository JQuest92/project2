DROP DATABASE IF EXISTS hot_chicken;
create database hot_chicken;
use hot_chicken;

DROP TABLE IF EXISTS reviews;
create table reviews(
restaurantName VARCHAR(500) NOT NULL,
restaurantAddress VARCHAR(100) NOT NULL,
userFirstName VARCHAR(100) NOT NULL,
userLastName VARCHAR(100) NOT NULL,
user_id INT UNIQUE,
restaurant_id INT UNIQUE,
score INT, /*1-5 rating*/
comment VARCHAR(500) NOT NULL,
PRIMARY KEY(user_id, restaurant_id) 
);

INSERT INTO reviews(restaurantName,restaurantAddress,userFirstName,userLastName, 
            user_id,restaurant_id,score,comment)
        VALUES("Pollo Loco", "Near you", "Alex", "Smith", 1, 1, 3, "Crazy chicken"),
                ("Pollo rico", "Far from you", "Pedro", "Rodriguez", 2, 2, 2, "Too far");

SELECT * FROM reviews;



DROP TABLE IF EXISTS restaurants;
create table restaurants(
name VARCHAR(500) NOT NULL,
address VARCHAR(100) NOT NULL,
city VARCHAR(100) default "Nashville",
state VARCHAR(2) default "TN",
zip INT,
latitude DECIMAL(10,8),
longitude DECIMAL(11,8),
phone VARCHAR(12),
website VARCHAR(200),
facebook VARCHAR(200),
createdAt VARCHAR(30),
updatedAt VARCHAR(30),
id INT AUTO_INCREMENT,
Primary Key(id)
);

INSERT INTO restaurants(name, address)
            VALUES("Pollo Loco", "Near you"),
                    ("Pollo rico", "Far from you");

SELECT * FROM restaurants;


DROP TABLE IF EXISTS users;
create table users
(
firstName VARCHAR(100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
email VARCHAR(250) NOT NULL,
id INT AUTO_INCREMENT,
code VARCHAR(250), /*possible password field*/
PRIMARY KEY(id)
);

INSERT INTO users(firstName,lastName,email)
        VALUES("Alex", "Smith", "alexsmith@test.com"),
                ("Pedro", "Rodriguez", "pedrorodriquez@test.com");

SELECT * FROM users;




