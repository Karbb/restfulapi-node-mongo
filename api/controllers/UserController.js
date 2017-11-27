'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.listAllUsers = function(req, res) {
  User.find({}).sort({ score: -1 }).limit(10).select({ username: 1, score: 1 }), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.createUser = function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.readUser = function(req, res) {
  User.findById(req.params.userId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.updateUser = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.deleteUser = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
