const worldData = require("../data/worlds.data.js");
const mingamesData = require("../data/minigames.data.js");
const teachersData = require("../data/teachers.data.js");
const studentsData = require("../data/students.data.js");
const resultsData = require("../data/results.data.js");

const taskController = require("../controllers/Task.controllers")

loadWorlds = (db) => {
  db.World.bulkCreate(worldData, {
    ignoreDuplicates: true,
  })
    .then(() => {
      console.log("Added World Data");
    })
    .catch(() => {
      console.log("Faliure to add World Data");
    });
};

loadMinigames = (db) => {
  db.Minigame.bulkCreate(mingamesData, {
    ignoreDuplicates: true,
  })
    .then(() => {
      console.log("Added Minigame Data");
    })
    .catch(() => {
      console.log("Faliure to add Minigame Data");
    });
};

loadTeachers = (db) => {
  db.Teacher.bulkCreate(teachersData, {
    ignoreDuplicates: true,
  })
    .then(() => {
      console.log("Added Teachers' Data");
    })
    .catch(() => {
      console.log("Faliure to add Teachers' Data");
    });
};

loadStudents = (db) => {
  db.Student.bulkCreate(studentsData, {
    ignoreDuplicates: true,
  })
    .then(() => {
      console.log("Added Students' Data");
    })
    .catch(() => {
      console.log("Faliure to add Students' Data");
    });
};

loadResults = (db) => {
  db.Result.bulkCreate(resultsData, {
    ignoreDuplicates: true,
  })
    .then(() => {
      console.log("Added Results Data");
    })
    .catch(() => {
      console.log("Faliure to add Results Data");
    });
};

module.exports = (db) => {
  loadWorlds(db);
  loadMinigames(db);
  loadTeachers(db);
  loadStudents(db);
  loadResults(db);

  taskController.createTask({params: {
    minigameId: 3,
    teacherId: 1,
    difficulty : "easy",
    level: 10}}, null)
  .catch((err)=> console.log({"Task Added. Warning:": err.message}))

  taskController.completeTask({params: {
    taskid: 2
  }})
};
