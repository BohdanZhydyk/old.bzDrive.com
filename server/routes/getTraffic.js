const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')


exports.getTraffic = (req, res)=>{

  let query = req.body.object.query

  bzDB( { req, res, collection:'bzStatistic', act:"FIND", query }, (data)=>{

      res.send({
        ...data,
        object:{
          ...data.object,
          result:[
            ...data.object.result
          ]
        }
      })

    }
  )

}
