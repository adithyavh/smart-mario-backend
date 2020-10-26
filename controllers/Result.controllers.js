/**
 * Result.controllers module.
 * @module Result.controllers
 */

const db = require("../models");
const Result = db.Result;
const Teacher = db.Teacher;

exports.getLeaderBoard = (req, res) => {
  Result.findAll({
    attributes: [[db.sequelize.fn('sum', db.sequelize.col('score')), 'total_score']],
    include : [db.Student],
    group : ['studentId'],
    raw: true,
    order: db.sequelize.literal('total_score DESC')
  })
  .then((data) => {
    res.send({success: true, data})
  })
  .catch((err) => {
    res.status(500).send({success: false, error: err.message})
  });
}

exports.getLeaderBoardRank = async (req, res) => {

  if (!req.params.studentId)
  {
    res.status(500).send({success: false, message: "No student ID"})
    return
  }
  studentId = req.params.studentId

  results = await Result.findAll({
    attributes: [[db.sequelize.fn('sum', db.sequelize.col('score')), 'total_score']],
    include : [db.Student],
    group : ['studentId'],
    raw: true,
    order: db.sequelize.literal('total_score DESC')
  })

  rank = 1
  for (let result of results)
  {
    if (result["student.id"]==studentId)
    {
      res.send({success: true, rank})
      return
    }
    rank++
  }
  res.status(500).send({success: false, message: "Student not on leaderboard"})
}

/**
 * Updates a result if it already exists. If not, a new Result is created
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.addOrUpdate = async (req, res) => {
  if (
    !req.body.studentId ||
    !req.body.minigameId ||
    !req.body.score ||
    !req.body.difficulty ||
    !req.body.level 
  ) {
    res.status(400).send({success: false, message: "Error. Incomplete Data" });
    return;
  }

  if (
    (!req.body.questions_attempted ||
    !req.body.questions_correct) && (!req.body.time_taken)
  )
  {
    res.status(400).send({success: false, message: "Error. Incomplete Data" });
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
      .send({success: false, message: "Error. Difficulty must be easy, medium or hard" });
    return;
  }

  prev_result = await Result.findOne({
    where : {
        "studentId": req.body.studentId,
        "minigameId": req.body.minigameId,
        "difficulty": req.body.difficulty,
        "level": req.body.level,
    },
    raw : true})

  if (prev_result && prev_result["score"]>req.body.score)
  {
    res.send({success: true, message: "New score is lower. No update necessary"})
    return
  }

  Result.upsert(result)
    .then((data) => {
      res.send({success: true, data: data[0]}); // SQLite will return [data, null]
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: "Error adding result", error: err });
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
    res.status(400).send({ success: false, message: "Error. studentId missing" });
  }

  let studentId = req.params.studentId;
  Result.findAll({ where: { studentId } })
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ success: false, message: "Error retrieving result", error: err.message });
        return
    });
};

exports.teacherResults = async (req, res) => {
  if (!req.params.teacherId) {
    res.status(400).send({ success: false, message: "Error. teacherId missing" });
    return
  }

  let teacherId = req.params.teacherId;

  let data = await Teacher.findByPk(teacherId, { 
    include: [{model: db.Student, 
      include : [{model: db.Result, include : [db.Minigame]}]
    }]})

  if (!data) 
  {
    res
      .status(500)
      .send({success: false, message: "Error retrieving result", error: err.message })
  }
  else
  {
    res.send({success: true, data: data["students"]})
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
    .then((data) => res.send({success: true, data}))
    .catch((err) => {
      res
        .status(500)
        .send({success: false, message: "Error retrieving result", error: err.message });
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
    res.status(400).send({success: false, message: "Error. Input incomplete" });
  }
  Result.findAll({
    where: {
      studentId: req.params.studentId,
      minigameId: req.params.minigameId,
      difficulty: req.params.difficulty,
      level: req.params.level,
    },
  })
    .then((data) => res.send({success: true, data}))
    .catch((err) => {
      res
        .status(500)
        .send({ success: false, message: "Error retrieving result", error: err.message });
    });
};
