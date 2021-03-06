const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    img: { type: String },
    gender: { type: String },
    age: { type: String },
    weight: { type: String },
    height: { type: String },
    wrist: { type: String },
    waist: { type: String },
    chest: { type: String },
    thigh: { type: String },
    pelvis: { type: String },
    ankle: { type: String },
    armdiameter: { type: String },
    musclediameter: { type: String },
    fatpercentage: { type: String },
    bonepercentage: { type: String },
    active: { type: String },
    nutrition: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    plan: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercises" }],
  },
 
);

module.exports = mongoose.model("User", user);
