const db = require("../models");
const Task = db.Task;
const Student = db.Student;

async function getStudents (teacherId)
{
  let data =  await Student.findAll({where: {teacherId}, raw : true})
  return data
}

function taskExists(minigameId,teacherId,difficulty,level) {
  return Task.count({ where: { minigameId,teacherId,difficulty,level } }).then((count) => {
    console.log(count)
    if (count !== 0) {
      return true;
    }
    return false;
  });
}

exports.createTask = async (req, res) => {
  if (
    !req.params.minigameId ||
    !req.params.teacherId ||
    !req.params.difficulty ||
    !req.params.level
  ) {
    res.status(400).send({ success: false, message: "Error. Incomplete Data" });
    return;
  }

  if (await taskExists(req.params.minigameId,
    req.params.teacherId,
    req.params.difficulty,req.params.level))
  {
    res.status(500).send({success: false,  message: "Error. Task Exists" });
    return;
  }

  let studentsList = await getStudents (req.params.teacherId);
  let tasksList = []
  
  if (studentsList.length === 0)
  {
    res.status(500).send({success: false,  message: "Error. No students" });
    return;
  }

  for (let student of studentsList)
  {
    let task = {
      minigameId: req.params.minigameId,
      studentId: student["id"],
      teacherId: req.params.teacherId,
      difficulty: req.params.difficulty,
      level: req.params.level,
      completed: "Incomplete",
    };

    tasksList.push(task)
  }

  // console.log(tasksList)

  db.Task.bulkCreate(tasksList, {
    ignoreDuplicates: true,
  })
    .then((data) => {
      res.send({success: true, message : "Tasks Created", data: data});
    })
    .catch((err) => {
      res.status(500).send({success: false, message : err.message || "Faliure to add create tasks"} );
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

  Task.update({ completed: "Completed" }, { where: { id: taskid } })
    .then((data) => res.send("Task " + taskid + " marked as complete"))
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error retrieving task", error: err.message }),
    );
};

exports.resetTask = (req, res) => {
  let taskid = req.params.taskid;

  Task.update({ completed: "Incomplete" }, { where: { id: taskid } })
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
      ["studentId", "ASC"],
    ],
    include: [db.Student, db.Minigame],
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

exports.getTeacherTasksPerLevel = (req, res) => {
  let teacherId = req.params.teacherId;
  let minigameId = req.params.minigameId;
  let difficulty = req.params.difficulty;
  let level = req.params.level;

  Task.findAll({
    where: {
      teacherId: teacherId,
      minigameId:minigameId,
      difficulty:difficulty,
      level:level
    },
    order: [
      ["studentId", "ASC"],
    ],
    include: [db.Student, db.Minigame],
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
    include: [db.Student, db.Minigame],
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
