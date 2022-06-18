const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')


exports.getCookies = (req, res)=>{

  let _id = new ObjectID('61e34a53ec2924000200834d')

  bzDB( { req, res, collection:'bzState', act:"FIND_ONE", query:{_id} }, (data)=>{

      res.send({
        ...data,
        object:{
          ...data.object,
          result:{
            ...data.object.result
          }
        }
      })

    }
  )

}
