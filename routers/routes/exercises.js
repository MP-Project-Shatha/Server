const express = require("express");
const exercisesRouter = express.Router();

const {
    newExercises,
    getExercises,
    getAllExercises,
    updateExercises,
} = require("../controllers/exercises");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

exercisesRouter.get("/Exercises/:_id", getExercises);

exercisesRouter.get("/allExercises", getAllExercises);

exercisesRouter.put("/updateExercises/:_id",  updateExercises);

exercisesRouter.post("/newExercises",  newExercises);



module.exports = exercisesRouter;