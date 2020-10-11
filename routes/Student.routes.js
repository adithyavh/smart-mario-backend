/**
 *
 * @module Student.routes handles routing for routes related to getting/setting student data
 * @requires ../controllers/Student.controllers
 * @requires express
 */
module.exports = (app) => {
  const student_fns = require("../controllers/Student.controllers.js");

  const router = require("express").Router();

  router.get("/", student_fns.findAll);
  router.post("/", student_fns.createStudent);
  router.post("/authenticate", student_fns.authenticate);

  app.use("/api/students", router);
};
