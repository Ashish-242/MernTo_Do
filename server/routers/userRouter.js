const express = require("express");
const userR = express.Router();
const {
  signup,
  login,
  logout,
  protectRoute,
} = require("../controller/authController");

// user's work
userR.route("/signup").post(signup);
userR.route("/login").post(login);

userR.use(protectRoute);

userR.route("/logout").get(logout);

module.exports = userR;