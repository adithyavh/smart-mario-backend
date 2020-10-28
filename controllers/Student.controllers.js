/**
 * Student.controllers module.
 * @module Student.controllers
 */

const { Student, Teacher, Op } = require("../models");
const S = require("string")

/**
 * Checks if student's username entered is unique in the database
 *
 * @param {string} username - Candidate username to be checked
 */
function isUniqueUsername(username) {
  return Student.count({ where: { username } }).then((count) => {
    if (count != 0) {
      return false;
    }
    return true;
  });
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
 * Checks if given student has a valid teacher key that points to a teacher
 *
 * @param {string} fk_teacher_key - teacher key to be checked
 */
function has_teacher(fk_teacher_key) {
  return Teacher.count({ where: { id: fk_teacher_key } }).then((count) => {
    if (count != 0) {
      return true;
    }
    return false;
  });
}

/**
 * Creates a new student account
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.createStudent = async (req, res) => {
  if (
    !req.body.username ||
    !req.body.teacher_key ||
    !req.body.password ||
    !req.body.name
  ) {
    res.status(400).send({
      message: "Error. Data Missing",
    });
    return;
  }

  const unique = await isUniqueUsername(req.body.username);
  console.log(unique);
  if (!unique) {
    res.status(400).send({
      message: "Error. Username Taken",
    });
    return;
  }

  const hasTeacher = await has_teacher(req.body.teacher_key);
  if (!hasTeacher) {
    res.status(400).send({
      message: "Error. Invalid Teacher Key",
    });
    return;
  }

  if (!isValidPassword(req.body.password))
  {
    res.status(400).send({
      message: "Error. Weak Password",
    });
    return;
  }

  // Create a student object
  const student = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    teacherId: req.body.teacher_key,
    custom : "0"
  };

  // Add student object to Student table
  Student.create(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error creating student",
      });
    });
};

exports.getOneStudent = (req, res) => {
  let studentId = req.params.studentId;

  Student.findByPk(studentId)
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving student", error: err.message });
    });
}

exports.changeCustom = (req, res) => {

  let studentId = req.params.studentId;
  let custom = req.params.custom;

  Student.update({ custom: custom }, {where: {id: studentId}})
    .then((data) => {

      if (data[0] ===0) // number of rows affected
        res.status(500).send({"success": false, message: "Error changing custom"})
      else
        res.send ({success: true})
    })
    .catch((err) => {
      res
        .status(500)
        .send({"success": false, message: "Error changing custom", error: err.message });
    });
}

/**
 * Retrieves all student account details. For testing only.
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.findAll = (req, res) => {
  Student.findAll({ include: Teacher })
    .then((data) => {
      if (data === null) {
        res.status(400).send({
          message: "Error. No students",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving student.   ${err.message}`,
      });
    });
};

/**
 * Validates whether given student details correspond to an entry in the database
 *
 * @param {Obj} req - The request handler with a JSON body object with input variables
 * @param {Obj} res - The response handler
 */
exports.authenticate = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Student.findOne({
    where: {
      username: username,
      password: password,
    },
    include: Teacher,
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
        message: `Error retrieving student ${err.message}`,
      });
    });
};
