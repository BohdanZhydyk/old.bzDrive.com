const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')
const {getRandomColor} = require('./../functions')


exports.getProfile = (req, res)=>{
  
  let object = req.body.object

  // GET PROFILE
  object.getProfile &&
  bzDB( { req, res, col:`bzUsers`, act:"FIND_ONE", query:{"login":object.login} }, (data)=>{
    
    res.send({
      ...data,
      object:{
        ...data.object,
        result:{
          login: data.object.result.login,
          email: data.object.result.email,
          role: data.object.result.role,
          lang: data.object.result.lang,
          sex: data.object.result.sex,
          ava: data.object.result.ava
        }
      }
    })

  })
  
  // CHANGE AVA
  object.chgAva &&
  bzDB( { req, res, col:`bzUsers`, act:"FIND_ONE", query:{"login":object.login} }, (data)=>{

    console.log("db",data.object.result)

    let query = {ava:object.fileName, _id:new ObjectID(data._id)}
    
    bzDB( { req, res, col:`bzUsers`, act:"UPDATE_ONE", query }, (data)=>{
      
      res.send({
        ...data,
        object:{
          ...data.object,
          result:{
            login: data.object.result.login,
            email: data.object.result.email,
            role: data.object.result.role,
            lang: data.object.result.lang,
            sex: data.object.result.sex,
            ava: data.object.result.ava
          }
        }
      })

    })

  })
  
}