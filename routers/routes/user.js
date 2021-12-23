const express = require("express");
const userRoute = express.Router();

const { register, activate, login, addInfo, getInfo } = require("./../controllers/user");
const authentication = require("./../middleware/authentication");

userRoute.post("/register", register);
userRoute.get("/activate/:token", activate);
userRoute.post("/login", login);
userRoute.post("/addInfo", addInfo);
userRoute.get("/getInfo/:id", getInfo);
// userRoute.post('/forgott', forgotPassword);
// userRoute.get('/forgot/:token', gotoReset);
// userRoute.post('/reset/:id', resetPassword);

module.exports = userRoute;
