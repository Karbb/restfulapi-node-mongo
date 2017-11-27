'use strict';
module.exports = function(app) {
  var userList = require('../controllers/UserController');

  //Routes
  app.route('/users')
    .get(userList.listAllUsers)
    .post(userList.createUser);

  app.route('/users/:userId')
    .get(userList.readUser)
    .put(userList.updateUser)
    .delete(userList.deleteUser);
};
