module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    custom : {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

  return Student;
};
