const worldData = require("../data/worlds.data.js");
const mingamesData = require("../data/minigames.data.js");
const teachersData = require("../data/teachers.data.js");
const studentsData = require("../data/students.data.js");

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

module.exports = (db) => {
  loadWorlds(db);
  loadMinigames(db);
  loadTeachers(db);
  loadStudents(db);
};
