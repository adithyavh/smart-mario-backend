module.exports = (sequelize, Sequelize) => {
  const Minigame = sequelize.define("minigame", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Minigame;
};
