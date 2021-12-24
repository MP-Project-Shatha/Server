const mongoose = require("mongoose");

const exercises = new mongoose.Schema(
  {
    title: { type: String },
    img: { type: String },
    video: { type: String },
    desc: { type: String, require: true },
    time: { type: Date },
     show: {type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exercises", exercises);
