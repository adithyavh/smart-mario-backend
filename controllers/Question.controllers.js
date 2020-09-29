const csv = require("csvtojson");

exports.getRandomMCQTheory = async (req, res) => {
  // let index = Math.floor(Math.random() * numMCQTheory) + 1;
  const jsonArray = await csv().fromFile("data/MCQ_Theory.csv");
  res.send({ message: "successful", allQuestions: jsonArray.slice(0,20)});
};

exports.getRandomMCQCode = async (req, res) => {
  const jsonArray = await csv().fromFile("data/MCQ_Code.csv");
  res.send({ message: "successful", Question: jsonArray });
};
exports.getRandomShortTheory = async (req, res) => {
  const jsonArray = await csv().fromFile("data/Short_Answer_Theory.csv");
  res.send({ message: "successful", Question: jsonArray });
};
exports.getRandomShortCode = async (req, res) => {
  const jsonArray = await csv().fromFile("data/Short_Answer_Code.csv");
  res.send({ message: "successful", Question: jsonArray });
};

// exports.getRandomMCQTheory(1,1)
//     .then((data)=> {console.log(data)})
//     .catch((err)=> {console.log("ERROR", err.message)})
