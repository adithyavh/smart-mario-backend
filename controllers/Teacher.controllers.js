const { Student, Teacher, Op } = require("../models");

function isUniqueUsername (username) {
    return Teacher.count({ where: { username: username } })
      .then(count => {
        if (count != 0) {
          return false;
        }
        return true;
    });
}

exports.createTeacher = async (req, res) => {
    if (!req.body.username)
    {
        res.status(400).send({
            message: "Error. Username Empty"
        })
        return
    }
    else if (!req.body.password)
    {
        res.status(400).send({
            message: "Error. Password Empty"
        })
        return
    }
    else if (!req.body.teacher_key)
    {
        res.status(400).send({
            message: "Error. School Key Empty"
        })
        return
    }

    unique = await isUniqueUsername(req.body.username)
    if (!unique)
    {
        res.status(400).send({
            message: "Error. Username Taken"
        })
        return
    }

    const teacher = {
        username : req.body.username,
        password : req.body.password,
        teacher_key : req.body.teacher_key
    }

    Teacher.create(teacher)
        .then( data => {
            res.send(data)
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "Error creating teacher"
            })
        })

}

exports.findAll = (req, res) => {

    Teacher.findAll()
    .then(data => {
        if (data===null)
        {
            res.status(400).send({
                message: "No students"
            })
        }
        else
        {
            res.send(data)
        }
    })
    .catch( err => {
        res.status(500).send({
            message: "Error retrieving student. " + err.message
        })
    })
}

exports.authenticate = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    Student.findOne({where: {
        username: username,
        password: password
    }})
    .then(data => {
        if (data===null)
        {
            res.status(400).send({
                message: "Wrong username or password",
                result : false
            })
        }
        else
        {
            res.send({
                message: "Successful Login",
                result : true,
                data : data // remove later
            })
        }
    })
    .catch( err => {
        res.status(500).send({
            message: "Error retrieving student" + err.message
        })
    })
}