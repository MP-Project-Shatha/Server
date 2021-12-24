const express = require("express");
const likeRouter = express.Router();

// const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization");


const { newLike } = require("../controllers/like");

likeRouter.get("/like/:id", newLike);

module.exports = likeRouter;