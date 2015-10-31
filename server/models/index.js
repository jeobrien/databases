var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // db.get
      db.connection.query(sqlQueries.getAllMessages, function(err, results) {
        if (err) {
          console.error(err);
        } else {
          callback(results);
        }
      });
      db.connection.end();
    }, // a function which produces all the messages
    post: function (message, callback) {
      // var postMessage = 'INSERT into messages(message_text, room_id_Rooms, user_id_Users)
      // SELECT username
      // FROM messages m inner join users u on (m.user_id = )
      //  values ('+db.connection.escape(message.message) + ')
      //                   '
      // values (+db.connection.escape(message.message) + ',' + db.connection.escape(message.roomname) + ',' + db.connection.escape(message.username)+');
      db.connection.query(postMessage, function(err, results) {
        if (err) {
          console.error(err);
        } else {
          callback(results);
        }
      });
      db.connection.end();
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function (callback) {
      db.connection.query(sqlQueries.getAllUsers, function(err, results) {
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
// 'insert into messages (message_text, user_id_rooms, room_id_rooms)
// from messages
// values (' + db.connection.escape(message.message)')

// insert into messages (user_id_rooms)
// from users
// where user_id = (select user_id from users where user_name =' + db.connection.escape(message.username) + '); 
// values (user_id)

// insert into messages (room_id_rooms)
// from rooms
// where room_id = (select room_id from rooms where room_name =' + db.connection.escape(message.roomname) + ')
// values (room_id)'

// do all the queries in here
// var sqlQueries = {
//   getAllMessages:
//   'SELECT u.user_name, m.message_text, r.room_name
//   FROM messages m join users u
//   ON (u.user_id = m.user_id_Users)
//   join rooms r
//   ON (r.room_id = m.room_id_Rooms);',

//   getAllUsers:
//   'SELECT u.user_name
//   FROM users;',
  
//   postMessage: 
//     'INSERT into messages
//     (message_text, room_id_Rooms, user_id_Users)
//     values ('+message.text+','+message.roomname+','+message.username+');',
  
//   addUser: 
//   'INSERT into users
//   (user_name) values ('+username+');'
// };