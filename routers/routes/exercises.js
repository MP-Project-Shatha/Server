const express = require("express");
const exercisesRouter = express.Router();

const {
  newExercises,
  getExercises,
  getAllExercises,
  updateExercises,
  searchUser,
  softDel,

} = require("../controllers/exercises");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

exercisesRouter.get("/Exercises/:_id", getExercises);

exercisesRouter.get("/allExercises", getAllExercises);

exercisesRouter.put("/updateExercises/:_id", updateExercises);

exercisesRouter.post("/newExercises", newExercises);
exercisesRouter.post("/search", searchUser);
exercisesRouter.put("/softDelete/:_id", softDel);


module.exports = exercisesRouter;


