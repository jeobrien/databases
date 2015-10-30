CREATE DATABASE chat;

USE chat;
CREATE TABLE rooms (
  room_id int NOT NULL AUTO_INCREMENT,
  room_name varchar(20),
  PRIMARY KEY(room_id)
);

CREATE TABLE users (
  user_id int NOT NULL AUTO_INCREMENT,
  user_name varchar(20),
  PRIMARY KEY(user_id)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  message_id int(5) NOT NULL AUTO_INCREMENT,
  message_text text(250),
  created datetime,
  room_id_Rooms int,
  user_id_Users int,
  PRIMARY KEY(message_id),
  FOREIGN KEY(room_id_Rooms) REFERENCES rooms(room_id),
  FOREIGN KEY(user_id_Users) REFERENCES users(user_id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

