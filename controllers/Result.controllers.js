const db = require("../models");
const Result = db.Result;

exports.addOrUpdate = (req, res) => {
  if (
    !req.body.studentId ||
    !req.body.minigameId ||
    !req.body.score ||
    !req.body.difficulty ||
    !req.body.level ||
    !req.body.questions_attempted ||
    !req.body.questions_correct
  ) {
    res.status(400).send({ message: "Error. Incomplete Data" });
    return;
  }

  const result = {
    studentId: req.body.studentId,
    minigameId: req.body.minigameId,
    difficulty: req.body.difficulty.toLowerCase(),
    level: req.body.level,
    score: req.body.score,
    questions_attempted: req.body.questions_attempted,
    questions_correct: req.body.questions_correct,
  };

  let valid_diff = ["easy", "medium", "hard"];
  if (!valid_diff.includes(result.difficulty)) {
    res
      .status(400)
      .send({ message: "Error. Difficulty must be easy, medium or hard" });
    return;
  }

  Result.upsert(result)
    .then((data) => {
      res.send(data[0]); // SQLite will return [data, null]
    })
    .catch((err) => {
      res.status(500).send({ message: "Error adding result", error: err });
    });
};

exports.studentResults = (req, res) => {
  if (!req.params.studentId) {
    res.status(400).send({ message: "Error. studentId missing" });
  }

  let studentId = req.params.studentId;
  Result.findAll({ where: { studentId } })
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving result", error: err.message });
    });
};

exports.getAll = (req, res) => {
  Result.findAll({})
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving result", error: err.message });
    });
};

exports.getOneResult = (req, res) => {
  if (
    !req.params.studentId ||
    !req.params.minigameId ||
    !req.params.difficulty ||
    !req.params.level
  ) {
    res.status(400).send({ message: "Error. Input incomplete" });
  }

  Result.findAll({
    where: {
      studentId: req.params.studentId,
      minigameId: req.params.minigameId,
      difficulty: req.params.difficulty,
      level: req.params.level,
    },
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving result", error: err.message });
    });
};
