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
  updateProfile,
  yourExercises,
  ExercisesUser,
  getExercises,
  RemoveExercisesUser,
} = require("./../controllers/user");
const authentication = require("./../middleware/authentication");

userRoute.post("/register", register);
userRoute.get("/activate/:token", activate);
userRoute.post("/login", login);
userRoute.post("/addInfo", addInfo);
userRoute.post("/getInfo/:id", getInfo);
userRoute.post("/forgott", forgotPassword);
userRoute.get("/forgot/:token", gotoReset);
userRoute.post("/reset/:id", resetPassword);
// 
userRoute.get("/email/:email", findUserByEmail);
userRoute.put("/edit/:email", editFullName);
userRoute.delete("/delete/:id", deleteUser);
userRoute.put("/updateProfile/:_id", updateProfile);
// 
userRoute.put("/yourPlan/:email/:ObjectId", yourExercises);
userRoute.put("/Exe/:email/:_id", ExercisesUser);
userRoute.put("/EExe/:email/:_id", RemoveExercisesUser);
userRoute.post("/Exee/:email", getExercises);
module.exports = userRoute;
