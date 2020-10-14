/**
 * Result.controllers module.
 * @module Result.controllers
 */

const db = require("../models");
const Result = db.Result;
const Teacher = db.Teacher;

/**
 * Updates a result if it already exists. If not, a new Result is created
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.addOrUpdate = (req, res) => {
  if (
    !req.body.studentId ||
    !req.body.minigameId ||
    !req.body.score ||
    !req.body.difficulty ||
    !req.body.level 
  ) {
    res.status(400).send({ message: "Error. Incomplete Data" });
    return;
  }

  if (
    (!req.body.questions_attempted ||
    !req.body.questions_correct) && (!req.body.time_taken)
  )
  {
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
    time_taken: req.body.time_taken
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

/**
 * Retreives all result posted in the server based on studentID
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
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

exports.teacherResults = async (req, res) => {
  if (!req.params.teacherId) {
    res.status(400).send({ message: "Error. teacherId missing" });
  }

  let teacherId = req.params.teacherId;

  let data = await Teacher.findByPk(teacherId, { 
    include: {model: db.Student, include : [db.Result]}})

  if (!data) 
  {
    res
      .status(500)
      .send({ message: "Error retrieving result", error: err.message })
  }
  else
  {
    res.send(data["students"])
  }
};

/**
 * Retreives all results posted in the server. For testing purposes only.
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.getAll = (req, res) => {
  Result.findAll({})
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving result", error: err.message });
    });
};

/**
 * Retreives one result posted in the server, based on studentID, minigame, difficulty and level.
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
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
