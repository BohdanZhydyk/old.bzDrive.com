const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')
const {getRandomColor} = require('./../functions')


exports.getProfile = (req, res)=>{
  
  let object = req.body.object

  // GET USERS
  object.getUsers &&
  bzDB( { req, res, col:`bzUsers`, act:"FIND", lim:object.lim, query:object.query }, (data)=>{
    
    res.send({
      ...data,
      object:{
        ...data.object,
        result: data.object.result.map( el=>{
          return {...el, pass:false}
        })
      }
    })

  })

  // SAVE USERS
  object.saveUsers &&
  bzDB( { req, res, col:`bzUsers`, act:"FIND_ONE", query:{login:object.login} }, (data)=>{

    let _id = new ObjectID(data.object.result._id)
    let query = {dealer:object.dealer, _id}
    
    bzDB( { req, res, col:`bzUsers`, act:"UPDATE_ONE", query }, (data)=>{
      
      bzDB( { req, res, col:`bzUsers`, act:"FIND_ONE", query:{login:object.login} }, (data)=>{

        res.send({
          ...data,
          object:{
            ...data.object,
            result: data.object.result
          }
        })
      })

    })

  })

  // GET TRAFFIC
  object.getTraffic && getTraffic()
  function getTraffic(){

    let IPs = []
    let traffic = []
  
    let query = {"user.login":object.login, "IP.host":"bzdrive.com"}
  
    bzDB( { req, res, col:'bzStatistic', act:"FIND", query }, (data)=>{
  
      data.object.result.map( el=>{
        if( el.IP.ip && !IPs.includes(el.IP.ip) ){
          IPs.push(el.IP.ip)
          traffic.push(el)
        }
      })
  
      res.send({
        ...data,
        object:{
          ...data.object,
          result: traffic
        }
      })
  
    })

  }
  
  // CHANGE AVA
  object.chgAva &&
  bzDB( { req, res, col:`bzUsers`, act:"FIND_ONE", query:object.query[0] }, (data)=>{

    let _id = new ObjectID(data.object.result._id)
    let query = {...object.query[1], _id}
    
    bzDB( { req, res, col:`bzUsers`, act:"UPDATE_ONE", query }, (data)=>{
      
      bzDB( { req, res, col:`bzUsers`, act:"FIND_ONE", query:object.query[0] }, (data)=>{

        res.send({
          ...data,
          object:{
            ...data.object,
            result: {...data.object.result, pass:false}
          }
        })
      })

    })

  })
  
}