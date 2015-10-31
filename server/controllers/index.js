var models = require('../models');
var app = require('../app');

module.exports = {
  messages: {
    get: function (req, res) {
      // receive get queries from router (req)
      // call get on model (res)
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = {username: "Hayley", message: "HELLO", roomname: "Lobby"};
      models.messages.post(message, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
      // receive post queries from router (req)
      // call post on model (res)
    } // a function which handles posting a message to the database

  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // call controller get all users
      // on response, send the data with all users
    },
    post: function (req, res) {
      models.users.post(req.body.username, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
    }
  }
};

