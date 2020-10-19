/**
 * Question.controllers module.
 * @module Question.controllers
 */
const csv = require("csvtojson");

/**
 * Retrieves all MCQ Theory Questions
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.getRandomMCQTheory = async (req, res) => {
  // let index = Math.floor(Math.random() * numMCQTheory) + 1;
  const jsonArray = await csv().fromFile("data/MCQ_Theory.csv");
  // res.send({ message: "successful", allQuestions: jsonArray.slice(0, 20) });
  res.send({ message: "successful", allQuestions: jsonArray });
};

/**
 * Retrieves all MCQ Code Questions
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.getRandomMCQCode = async (req, res) => {
  const jsonArray = await csv().fromFile("data/MCQ_Code.csv");
  res.send({ message: "successful", Question: jsonArray });
};

/**
 * Retrieves all Short Theory Questions
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.getRandomShortTheory = async (req, res) => {
  const jsonArray = await csv().fromFile("data/Short_Answer_Theory.csv");
  res.send({ message: "successful", Question: jsonArray });
};

/**
 * Retrieves Short MCQ Code Questions
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.getRandomShortCode = async (req, res) => {
  const jsonArray = await csv().fromFile("data/Short_Answer_Code.csv");
  res.send({ message: "successful", Question: jsonArray });
};
