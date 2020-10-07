/**
 *
 * @module Question.routes handles routing for getting/setting data related to Questions
 * @requires ../controllers/Question.controllers
 * @requires express
 */
module.exports = (app) => {
  const qn_fns = require("../controllers/Question.controllers.js");

  const router = require("express").Router();

  router.get("/mcqtheory", qn_fns.getRandomMCQTheory);
  router.get("/mcqcode", qn_fns.getRandomMCQCode);
  router.get("/shorttheory", qn_fns.getRandomShortTheory);
  router.get("/shortcode", qn_fns.getRandomShortCode);

  app.use("/api/questions", router);
};
