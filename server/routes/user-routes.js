const express = require("express");
const userController = require("../controllers/user-controller");
const customInterceptor = require("../interceptors/custom-interceptor");

const router = express.Router();

router
  .route("/add-user")
  .post(customInterceptor.checkBody, userController.addUser);

router
  .route("/:id")
  .patch(customInterceptor.checkBody, userController.updateUser);

router.route("/:id").delete(userController.deleteUser);

router.route("/:size/:page").get(userController.getUsers);

module.exports = router;
