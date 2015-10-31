var models = require('../models');
var app = require('../app');
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
    },
    post: function (req, res) {
      // var message = {username: "Hayley", message: "HELLO", roomname: "Lobby"};
      models.messages.post(req.body, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
    }
  },
  users: {
    get: function (req, res) {
      models.users.get(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
        }
      });
    },
    post: function (req, res) {
      models.users.post(req.body.username, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          // db.connection.end();
          res.send(data);
        }
      });
    }
  }
};

