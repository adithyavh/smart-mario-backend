const db = require("../models");
const Result = db.Result;
sequelize = db.sequelize

// const result = {
//     "studentId": "2",
//     "minigameId": "3",
//     "difficulty": "hard",
//     "level": 11,
//     "score": 200,
//     "questions_attempted": 2,
//     "questions_correct": 3,
// };

Result.findOne({
    where : {
        "studentId": "2",
        "minigameId": "3",
        "difficulty": "hard",
        "level": 11,
    },
    raw : true
}
).then ((data) => console.log(data))
.catch ((err)=> console.log(err.message))