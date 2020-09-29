const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,

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
db.Challenge = require("./Challenge.models.js")(sequelize, Sequelize);

// User.belongsTo(Company, {foreignKey: 'fk_companyname', targetKey: 'name'});
// Adds fk_companyname to User

db.Student.belongsTo(db.Teacher, {
  foreignKey: "fk_teacher_key",
  sourceKey: "id",
});
db.Student.belongsToMany(db.Challenge, { through: "Student_Challenge" });
db.Challenge.belongsToMany(db.Student, { through: "Student_Challenge" });

module.exports = db;

// const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
//   host: dbConfig.host,
//   dialect: dbConfig.dialect,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });
