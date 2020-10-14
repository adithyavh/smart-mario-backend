/**
 * @module models contains configuration for database and schema objects
 *
 */

const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

/**
 * @typedef {Object} Sequelize
 * @property {string} dialect type of SQL used
 * @property {string} storage type of logging
 * @property {Object} pool additional configuration for SQL database
 */
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

/**
 * @typedef {Object} db contains schemas of all entities and logic mapping entities to each other
 * @requires ./Student.models Student schema
 * @requires ./Teacher.models Teacher schema
 * @requires ./World.models World schema
 * @requires ./Minigame.models Minigame schema
 * @requires ./Challenge.models Challenge schema
 * @requires ./Result.models Result schema
 */
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require("./Student.models.js")(sequelize, Sequelize);
db.Teacher = require("./Teacher.models.js")(sequelize, Sequelize);
db.World = require("./World.models.js")(sequelize, Sequelize);
db.Minigame = require("./Minigame.models.js")(sequelize, Sequelize);
db.Challenge = require("./Challenge.models.js")(sequelize, Sequelize);
db.Result = require("./Result.models")(sequelize, Sequelize, db);
db.Task = require("./Task.models")(sequelize, Sequelize, db);

// User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'});
// Adds fk_companyname to User

db.Student.belongsTo(db.Teacher, {
  foreignKey: "teacherId",
  sourceKey: "id",
});

db.Teacher.hasMany(db.Student)

//------------------- //

db.Student.hasMany(db.Result)

//------------------- //
db.Minigame.belongsTo(db.World, {
  foreignKey: "world_id",
  sourceKey: "id",
});

//------------------- //

db.Student.belongsToMany(db.Challenge, {
  through: "Student_Challenge",
  unique: true,
});

db.Challenge.belongsToMany(db.Student, {
  through: "Student_Challenge",
  unique: true,
});

//------------------- //
db.Task.belongsTo(db.Student, {
  foreignKey: "studentId",
  sourceKey: "id",
});

db.Task.belongsTo(db.Teacher, {
  foreignKey: "teacherId",
  sourceKey: "id",
});

db.Task.belongsTo(db.Minigame, {
  foreignKey: "minigameId",
  sourceKey: "id",
});
//------------------- //

module.exports = db;
