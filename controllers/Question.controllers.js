const csv = require("csvtojson");

exports.getRandomMCQTheory = async (req, res) => {
  // let index = Math.floor(Math.random() * numMCQTheory) + 1;
  const jsonArray = await csv().fromFile("data/MCQ_Theory.csv");
  res.send({ message: "successful", allQuestions: jsonArray});
};

exports.getRandomMCQCode = async (req, res) => {
  let index = Math.floor(Math.random() * numMCQCode) + 1;
  const jsonArray = await csv().fromFile("data/MCQ_Code.csv");
  let jsonQn = jsonArray[index];
  res.send({ message: "successful", Question: jsonQn });
};
exports.getRandomShortTheory = async (req, res) => {
  let index = Math.floor(Math.random() * numShortTheory) + 1;
  const jsonArray = await csv().fromFile("data/Short_Answer_Theory.csv");
  let jsonQn = jsonArray[index];
  res.send({ message: "successful", Question: jsonQn });
};
exports.getRandomShortCode = async (req, res) => {
  let index = Math.floor(Math.random() * numShortCode) + 1;
  const jsonArray = await csv().fromFile("data/Short_Answer_Code.csv");
  let jsonQn = jsonArray[index];
  res.send({ message: "successful", Question: jsonQn });
};

// exports.getRandomMCQTheory(1,1)
//     .then((data)=> {console.log(data)})
//     .catch((err)=> {console.log("ERROR", err.message)})
