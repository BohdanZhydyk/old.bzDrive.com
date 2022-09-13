const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')


exports.getCV = (req, res)=>{

  let _id = new ObjectID('61ed45fdec29246c9a00834d')

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