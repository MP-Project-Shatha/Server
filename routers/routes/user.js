const express = require("express");
const userRoute = express.Router();

const {
  register,
  activate,
  login,
  addInfo,
  getInfo,
  forgotPassword,
  gotoReset,
  resetPassword,
  findUserByEmail,
  editFullName,
  deleteUser,
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");

userRoute.post("/register", register);
userRoute.get("/activate/:token", activate);
userRoute.post("/login", login);
userRoute.post("/addInfo", addInfo);
userRoute.get("/getInfo/:id", getInfo);
userRoute.post("/forgott", forgotPassword);
userRoute.get("/forgot/:token", gotoReset);
userRoute.post("/reset/:id", resetPassword);
// 
userRoute.get("/email/:email", findUserByEmail);
userRoute.put("/edit/:email", editFullName);
userRoute.delete("/delete/:id", deleteUser);

module.exports = userRoute;
