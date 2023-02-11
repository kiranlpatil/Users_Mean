const User = require("../schemas/user-schema");

exports.addNewUser = (userDetails) => {
  return new Promise((resolve, reject) => {
    let query = { email: userDetails.email };
    User.findOne(query, { email: 1 }).then((user) => {
      if (user) {
        reject({
          status: "failed",
          message: "User with same email is already added",
        });
      } else {
        User.create(userDetails)
          .then((result) => {
            resolve({ status: "success", data: result });
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  });
};

exports.updateUser = (userId, userDetails) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(userId, userDetails)
      .then((result) => resolve({ status: "success", data: result }))
      .catch((error) => reject(error));
  });
};

exports.deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    User.deleteOne({ _id: userId.toString() })
      .then(() => resolve({ status: "success", message: "Deleted User" }))
      .catch((error) => reject(error));
  });
};

exports.getUsers = (size, page) => {
  return new Promise((resolve, reject) => {
    let query = {};
    let options = {
      skip: page * size,
      limit: Number(size),
      sort: { createdAt: -1 },
    };
    User.countDocuments({}).then((count) => {
      User.find(query, null, options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({ status: "success", count: count, data: result });
        }
      });
    });
  });
};
