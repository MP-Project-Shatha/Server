const exercisesModel = require("../../db/models/exercises");

const newExercises = (req, res) => {
  const { img, desc, user, title, video,type } = req.body;
  // const { _id } = req.params;vff
  try {
    const newExercises = new exercisesModel({
      img,
      desc,
      user,
      video,
      title,
      type,
    });
    newExercises
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};
//

const getExercises = (req, res) => {
  const { _id } = req.params;
  try {
    exercisesModel.findOne({ _id: _id }).then((result) => {
      if (result.show == false) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Exercises not show");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
//

const getAllExercises = (req, res) => {
  try {
    exercisesModel.find({ show: false }).populate("like").then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const softDel = (req, res) => {
  const { _id } = req.params;
  try {
    exercisesModel.findOne({ _id: _id }).then((item) => {
      
      if (item) {
        exercisesModel.findById({ _id: _id }).then((item) => {
          if (item.show == false) {
            exercisesModel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { show: true } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          } else {
            exercisesModel
              .findByIdAndUpdate(
                { _id: _id },
                { $set: { show: false } },
                { new: true }
              )
              .then((result) => {
                res.status(200).json(result);
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          }
        });
      } else {
        res.status(403).send("Forbidden");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateExercises = (req, res) => {
  const { _id } = req.params;
  const { desc } = req.body;
  try {
    exercisesModel.findOne({ _id: _id }).then((item) => {
      if (item) {
        exercisesModel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { desc: desc, time: Date() } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });

        exercisesModel
          .findOneAndUpdate(
            { _id: _id },
            { $set: { desc: desc, time: Date() } },
            { new: true }
          )
          .then((result) => {
            res.status(200).json(result);
          });
      } else {
        res.status(404).send("Exercises not found");
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
const searchUser = (req, res) =>{
  
  const { title } = req.body;

  try {
    exercisesModel.findOne({ title}).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json(error);
  }
}
module.exports = {
  newExercises,
  getExercises,
  getAllExercises,
  updateExercises,
  searchUser,
  softDel,
};