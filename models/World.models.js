module.exports = (sequelize, Sequelize) => {
  const World = sequelize.define("world", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return World;
};
