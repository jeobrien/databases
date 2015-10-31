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
      // var postMessage = 'INSERT into messages(message_text, room_id_Rooms, user_id_Users)
      // SELECT username
      // FROM messages m inner join users u on (m.user_id = )
      //  values ('+db.connection.escape(message.message) + ')
      //                   '
      // values (+db.connection.escape(message.message) + ',' + db.connection.escape(message.roomname) + ',' + db.connection.escape(message.username)+');
      var postMessage = 'INSERT into messages(message_text, user_id_Users, room_id_Rooms) from messages inner join users on(messages.user_id = users.user_id) inner join rooms on(messages.room_id = rooms.room_id) values(' + db.connection.escape(message.message) + ', (select user_id from users where user_name = ' + db.connection.escape(message.username) + ', (select room_id from rooms where room_name = ' + db.connection.escape(message.roomname) + '));'
        // create variables that store each subquery then pass those through to the post 
      db.connection.query(postMessage, function(err, results) {
        if (err) {
          console.error(err);
        } else {
          callback(results);
        }
      });
      db.connection.end();
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



// subquery1: get user_id for user_name
// select user_id from users where user_name = db.connection.escape(message.username)

// subquery2: get room_id for room_name
// select room_id from rooms where room_name = db.connection.escape(message.roomname)  
