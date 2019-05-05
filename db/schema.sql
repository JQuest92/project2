create database hot_chicken;
use hot_chicken;


create table review(
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



create table restaurant
(
name VARCHAR(500) NOT NULL,
address VARCHAR(100) NOT NULL,
city VARCHAR(100) default "Nashville",
state VARCHAR(2) default "TN",
latitude DECIMAL(10,8),
longitude DECIMAL(11,8),
phone VARCHAR(12),
website VARCHAR(200),
facebook VARCHAR(200),
id INT UNIQUE,
Primary Key(id),
FOREIGN KEY(id) REFERENCES review(restaurant_id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table user
(
firstName VARCHAR(100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
email VARCHAR(250) NOT NULL,
id INT UNIQUE,
code VARCHAR(250), /*possible password field*/
PRIMARY KEY(id),
FOREIGN KEY(id) REFERENCES review(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);




