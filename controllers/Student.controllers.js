const { Student, Teacher, Op } = require("../models");

function isUniqueUsername(username) {
  return Student.count({ where: { username: username } }).then((count) => {
    if (count != 0) {
      return false;
    }
    return true;
  });
}

function has_teacher(fk_teacher_key) {
  return Teacher.count({ where: { id: fk_teacher_key } }).then((count) => {
    if (count != 0) {
      return true;
    }
    return false;
  });
}

exports.createStudent = async (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "Error. Username Empty",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "Error. Password Empty",
    });
    return;
  }
  if (!req.body.teacher_key) {
    res.status(400).send({
      message: "Error. Teacher Key Empty",
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

  // Create a student object
  const student = {
    username: req.body.username,
    password: req.body.password,
    fk_teacher_key: req.body.teacher_key,
  };

  // Add student object to Student table
  Student.create(student)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating student",
      });
    });
};

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

exports.update = (req, res) => {};

exports.delete = (req, res) => {};

exports.deleteAll = (req, res) => {};

exports.findAllPublished = (req, res) => {};
