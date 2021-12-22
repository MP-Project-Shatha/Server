const express = require("express");
const userRoute = express.Router();


const {
  resgister,
  activate,
  login
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");



userRoute.post("/resgister", resgister);
userRoute.get('/activate/:token', activate);
userRoute.post("/login", login);
// userRoute.post('/forgott', forgotPassword);
// userRoute.get('/forgot/:token', gotoReset);
// userRoute.post('/reset/:id', resetPassword);

module.exports = userRoute;