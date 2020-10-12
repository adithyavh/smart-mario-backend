module.exports = (sequelize, Sequelize, db) => {
  const Task = sequelize.define("task", {
    difficulty: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["easy", "medium", "hard"]],
      },
    },
    level: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    completed: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["yes", "no"]],
      },
    },
  });

  return Task;
};

// minigameId: {
//   type: Sequelize.INTEGER,
//   references: {
//     model: db.Minigame,
//     key: "id",
//   },
//   allowNull: false,
// },
// studentId: {
//   type: Sequelize.INTEGER,
//   references: {
//     model: db.Student,
//     key: "id",
//   },
//   allowNull: false,
// },
// teacherId: {
//   type: Sequelize.INTEGER,
//   references: {
//     model: db.Teacher,
//     key: "id",
//   },
//   allowNull: false,
// },
