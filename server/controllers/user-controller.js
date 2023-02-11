const userService = require("../services/user.service.js");

exports.addUser = (req, res) => {
  userService
    .addNewUser(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.updateUser = (req, res) => {
  userService
    .updateUser(req.params.id, req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.deleteUser = (req, res) => {
  userService
    .deleteUser(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.getUsers = (req, res) => {
  userService
    .getUsers(req.params.size, req.params.page)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
};
