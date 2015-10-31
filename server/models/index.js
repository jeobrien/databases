var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      var getAllMessages =
      'SELECT users.user_name, messages.message_text, rooms.room_name FROM messages join users ON (users.user_id = messages.user_id_Users) join rooms ON (rooms.room_id = messages.room_id_Rooms);'
      db.connection.query(getAllMessages, function(err, results) {
        if (err) {
          console.error(err);
        } else {
          callback(results);
        }
      });
      db.connection.end();
    },
    post: function (message, callback) {
      // insert message text, userid, room id into messages
      var roomIDQuery = 'SELECT room_id from rooms where room_name = ' + db.connection.escape(message.roomname) + ';'

      // store user id in a variable
      var userIDQuery = 'SELECT user_id from users where user_name = ' + db.connection.escape(message.username) + ';'
      var roomnameInsert = 'INSERT into rooms (room_name) values ('+ db.connection.escape(message.roomname) +');'
      var usernameInsert = 'INSERT into users (user_name) values (' + db.connection.escape(message.username) + ');'

      db.connection.query(roomIDQuery + userIDQuery, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
          var roomID = results[0][0];
          var userID = results[1][0];
          // room does not yet exist
          if (!roomID) {
            // insert room query
            db.connection.query(roomnameInsert + roomIDQuery + userIDQuery, function(err, results) {
              if (err) {
                console.error(err);
              } else {
                var roomID = results[1][0];
                var userID = results[2][0];
                var messageQuery = 'INSERT INTO messages (message_text, room_id_Rooms, user_id_Users) values (' + db.connection.escape(message.message) + ', ' + db.connection.escape(roomID.room_id) + ', ' + db.connection.escape(userID.user_id) + ');'

                if (!userID) {
                  db.connection.query(usernameInsert + userIDQuery + roomIDQuery, function(err, results) {
                    if (err) {
                      console.error(err);
                    } else {
                      var roomID = results[2][0];
                      var userID = results[1][0];
                      db.connection.query(messageQuery, function(err, results) {
                        if (err) {
                          console.error(err);
                        } else {
                          callback(results);
                        }
                      });
                    }
                  });
                } else {
                    db.connection.query(messageQuery, function(err, results) {
                      if (err) {
                        console.error(err);
                      } else {
                        callback(results);
                      }
                    });
                  }
                }
            });
          // room already exists
          } else {
            var messageQuery = 'INSERT INTO messages (message_text, room_id_Rooms, user_id_Users) values (' + db.connection.escape(message.message) + ', ' + db.connection.escape(roomID.room_id) + ', ' + db.connection.escape(userID.user_id) + ');'
            db.connection.query(messageQuery, function(err, results) {
              if (err) {
                console.error(err);
              } else {
                callback(results);
              }
            });
          }
        }
      });
    }
  },
  users: {
    get: function (callback) {
      var getAllUsers = 'SELECT user_name FROM users;'
      db.connection.query(getAllUsers, function(err, results) {
        if (err) {
          console.error(err);
        } else {
          callback(results);
        }
      });
      db.connection.end();
    },
    post: function (username, callback) {
      // check to make sure username isn't in database
      var addUser = 'INSERT into users(user_name) values(' + db.connection.escape(username) + ');'
      db.connection.query(addUser, function(err, results) {
        if (err) {
          console.error(err);
        } else {
          callback(results);
        }
      });
      db.connection.end();
    }
  }
};
