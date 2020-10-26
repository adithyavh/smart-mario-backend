db = require("../models")

test = async () => {

    studentId = "3"
  
    results = await db.Result.findAll({
      attributes: [[db.sequelize.fn('sum', db.sequelize.col('score')), 'total_score']],
      include : [db.Student],
      group : ['studentId'],
      raw: true,
      order: db.sequelize.literal('total_score DESC')
    })
  
    let rank = 1
    for (let result of results)
    {
      console.log(result)
      if (result["student.id"]==studentId)
      {
        return rank
      }
      rank++
    }
    return null
  }

test().then((data)=> console.log(data))