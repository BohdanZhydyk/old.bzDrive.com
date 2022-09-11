const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')


exports.getFin = (req, res)=>{

  let _id = new ObjectID('631de55bec292490c8fb867b')

  let object = req.body.object

  // GET STATE
  object.getState &&
  bzDB({ req, res, collection:'bzState', act:"FIND_ONE", query:{_id} }, (data)=>{

    res.send({
      ...data,
      object:{
        ...data.object,
        result:data.object.result
      }
    })

  })

  // SAVE STATE
  object.saveState &&
  bzDB({
    req, res, collection:`bzState`, act:"UPDATE_ONE",
    query:{name:"finanseApp_state", fin:object.fin, _id}
  }, (data)=>{

    bzDB( { req, res, collection:'bzState', act:"FIND_ONE", query:{_id} }, (data)=>{

      res.send({
        ...data,
        object:{
          ...data.object,
          result:data.object.result
        }
      })
  
    })

  })

}