const db = require("../models");
const Result = db.Result;

exports.addResult = (req, res) => {
  if (
    !req.body.studentId ||
    !req.body.minigameId ||
    !req.body.score ||
    !req.body.difficulty ||
    !req.body.level
  ) {
    res.status(400).send({ message: "Error. Incomplete Data" });
  }

  const result = {
    studentId: req.body.studentId,
    minigameId: req.body.minigameId,
    score: req.body.score,
    difficulty: req.body.difficulty,
    level: req.body.level,
  };

  Result.create(result)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error adding result", error: err });
    });
};

exports.studentResults = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: "Error. studentId missing" });
  }

  let studentId = req.params.id;
  Result.findAll({ where: { studentId } })
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving result", error: err.message });
    });
};
