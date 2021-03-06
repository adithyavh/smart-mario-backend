/**
 * Teacher.controllers module.
 * @module Teacher.controllers
 */

const { Student, Teacher, Op } = require("../models");
const S = require("string")

/**
 * Checks if teacher's username entered is unique in the database
 *
 * @param {string} username - Candidate username to be checked
 */
function isUniqueUsername(username) {
  return Teacher.count({ where: { username: username } }).then((count) => {
    if (count != 0) {
      return false;
    }
    return true;
  });
}

/**
 * Checks if the given teacher has a valid school key
 *
 * @param {string} school_key - school key to be checked
 */
function isValidSchoolKey(school_key) {
  let valid_school_ids = ["1", "2"];
  let valid = valid_school_ids.includes(school_key);
  //   console.log(school_key, valid);
  return valid;
}

const isValidPassword = (string) => {

  let number = false
  let upper = false
  let lower = false

  for (let i = 0 ; i<string.length; i++)
  {
    // console.log(string.charAt(i))
    let ch = S(string.charAt(i))

    if (ch.isAlpha())
    {
      if (ch.isLower())
      {
        lower = true
      }
      else
      {
        upper = true
      }
    }
    else if (ch.isNumeric)
    {
      number = true
    }
  }

  return (number && upper && lower)
}


/**
 * Creates a new teacher account
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
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

  if (!isValidPassword(req.body.password))
  {
    res.status(400).send({
      message: "Error. Weak Password. Password must contain at least 1 uppercase, 1 lowercase and 1 number.",
    });
    return;
  }

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

/**
 * Retrieves all teacher account details. For testing only.
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
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

/**
 * Validates whether given teacher's details correspond to an entry in the database
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
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
