module.exports = (sequelize, Sequelize, db) => {
  const Result = sequelize.define("result", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: Sequelize.INTEGER,
      references: {
        model: db.Student,
        key: "id",
        unique: false,
      },
    },
    minigameId: {
      type: Sequelize.INTEGER,
      references: {
        model: db.Minigame,
        key: "id",
        unique: false,
      },
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    difficulty: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    level: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Result;
};
