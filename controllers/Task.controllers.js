const db = require("../models");
const Task = db.Task;
const Student = db.Student;

exports.createTask = (req, res) => {
  if (
    !req.body.minigameId ||
    !req.body.studentId ||
    !req.body.teacherId ||
    !req.body.difficulty ||
    !req.body.level
  ) {
    res.status(400).send({ message: "Error. Incomplete Data" });
    return;
  }
  const task = {
    minigameId: req.body.minigameId,
    studentId: req.body.studentId,
    teacherId: req.body.teacherId,
    difficulty: req.body.difficulty,
    level: req.body.level,
    completed: "no",
  };

  Task.create(task)
    .then((data) => {
      res.send({ message: "Successful", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating task",
      });
    });
};

exports.getAll = (req, res) => {
  Task.findAll({})
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving task", error: err.message });
    });
};

exports.completeTask = (req, res) => {
  let taskid = req.params.taskid;

  Task.update({ completed: "yes" }, { where: { id: taskid } })
    .then((data) => res.send("Task " + taskid + " marked as complete"))
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error retrieving task", error: err.message }),
    );
};

exports.resetTask = (req, res) => {
  let taskid = req.params.taskid;

  Task.update({ completed: "no" }, { where: { id: taskid } })
    .then((data) => res.send("Task " + taskid + " marked as incomplete"))
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error retrieving task", error: err.message }),
    );
};

exports.getTeacherTasks = (req, res) => {
  let teacherId = req.params.teacherId;

  Task.findAll({
    where: {
      teacherId: teacherId,
    },
    order: [
      ["minigameId", "ASC"],
      ["difficulty", "ASC"],
      ["level", "ASC"],
    ],
    include: Student,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving tasks for students",
        error: err.message,
      });
    });
};

exports.getStudentTasks = (req, res) => {
  let studentId = req.params.studentId;

  Task.findAll({
    where: {
      studentId: studentId,
    },
    order: [["minigameId", "ASC"]],
    include: Student,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving tasks for students",
        error: err.message,
      });
    });
};
