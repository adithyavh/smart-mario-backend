const { Student, Teacher, Op } = require("../models");

function isUniqueUsername(username) {
  return Teacher.count({ where: { username: username } }).then((count) => {
    if (count != 0) {
      return false;
    }
    return true;
  });
}

function isValidSchoolKey(school_key) {
  let valid_school_ids = ["1", "2"];
  let valid = valid_school_ids.includes(school_key);
  //   console.log(school_key, valid);
  return valid;
}

exports.createTeacher = async (req, res) => {
  if (
    !req.body.username ||
    !req.body.school_key ||
    !req.body.password ||
    !req.body.name
  ) {
    res.status(400).send({
      message: "Error. Data Missing",
    });
    return;
  }

  let unique = await isUniqueUsername(req.body.username);
  if (!unique) {
    res.status(400).send({
      message: "Error. Username Taken",
    });
    return;
  }

  let valid_sch_key = isValidSchoolKey(req.body.school_key);
  if (!valid_sch_key) {
    res.status(400).send({
      message: "Error. Invalid School Key",
    });
    return;
  }

  const teacher = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    school_key: req.body.school_key,
  };

  Teacher.create(teacher)
    .then((data) => {
      res.send({ message: "Successful", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating teacher",
      });
    });
};

exports.findAll = (req, res) => {
  Teacher.findAll()
    .then((data) => {
      if (data === null) {
        res.status(400).send({
          message: "Error. No teachers",
        });
      } else {
        res.send({ message: "Successful", data: data });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving teachers. " + err.message,
      });
    });
};

exports.authenticate = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Teacher.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((data) => {
      if (data === null) {
        res.status(400).send({
          message: "Error. Wrong username or password",
          result: false,
        });
      } else {
        res.send({
          message: "Successful Login",
          result: true,
          data: data, // remove later
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving teacher" + err.message,
      });
    });
};
