const likeModel = require("../../db/models/like");
// const exercisesModel = require("../../db/models/exercises");

const newLike = (req, res) => {
  const { userId, exercisesId } = req.params;
  try {
    likeModel
      .findOneAndDelete({ $and: [{ desc: exercisesId }, { user: userId }] })
      .then((item) => {
        if (item) {
          res.status(200).send("like deleted");
        } else {
          const newLike = new likeModel({
            user: userId,
            desc: exercisesId,
          });
          newLike
            .save()
            .then((result) => {
              res.status(200).json(result);
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        }
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { newLike };
