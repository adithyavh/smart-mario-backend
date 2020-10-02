const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  logging: dbConfig.logging,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require("./Student.models.js")(sequelize, Sequelize);
db.Teacher = require("./Teacher.models.js")(sequelize, Sequelize);
db.World = require("./World.models.js")(sequelize, Sequelize);
db.Minigame = require("./Minigame.models.js")(sequelize, Sequelize);
db.Challenge = require("./Challenge.models.js")(sequelize, Sequelize);
db.Result = require("./Result.models")(sequelize, Sequelize, db);

// User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'});
// Adds fk_companyname to User

db.Student.belongsTo(db.Teacher, {
  foreignKey: "fk_teacher_key",
  sourceKey: "id",
});

db.Minigame.belongsTo(db.World, {
  foreignKey: "fk_world_id",
  sourceKey: "id",
});

db.Student.belongsToMany(db.Challenge, {
  through: "Student_Challenge",
  unique: true,
});
db.Challenge.belongsToMany(db.Student, {
  through: "Student_Challenge",
  unique: true,
});

module.exports = db;
