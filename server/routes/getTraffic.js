const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')


exports.getTraffic = (req, res)=>{

  let object = req.body.object

  object.getState &&
  bzDB( { req, res, col:'bzStatistic', act:"FIND", query:object.query }, (data)=>{

    let result = data.object.result.filter(el=> el.IP.host !== "localhost")

    res.send({ ...data, object:{...data.object, result} })

  })

  // object.longPulling && console.log("longPulling")
  // bzDB( { req, res, col:'bzStatistic', act:"FIND", query:object.query }, (data)=>{

  //   console.log("longPulling")

  //   // res.send({
  //   //   ...data,
  //   //   object:{
  //   //     ...data.object,
  //   //     result:[
  //   //       ...data.object.result
  //   //     ]
  //   //   }
  //   // })

  // })

}
