const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')


exports.getWorkshop = (req, res)=>{

  let _id = new ObjectID('61dca63dec292425dc00834d')

  bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{_id} }, (data)=>{

    res.send({
      ...data,
      object:{
        ...data.object,
        result:data.object.result
      }
    })

  })

}