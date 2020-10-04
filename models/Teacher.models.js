module.exports = (sequelize, Sequelize) => {
  const Teacher = sequelize.define("teacher", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    school_key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Teacher;
};
