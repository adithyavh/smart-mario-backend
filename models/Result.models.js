module.exports = (sequelize, Sequelize, db) => {
  const Result = sequelize.define("result", {
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    questions_attempted: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    questions_correct: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    time_taken: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    difficulty: {
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["easy", "medium", "hard"]],
      },
    },
    level: {
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false,
    },
    minigameId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: db.Minigame,
        key: "id",
      },
      allowNull: false,
    },
    studentId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: db.Student,
        key: "id",
      },
      allowNull: false,
    },
  });

  return Result;
};
