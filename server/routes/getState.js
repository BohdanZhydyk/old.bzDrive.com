const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')


exports.getState = (req, res)=>{

  let _id = new ObjectID('61dca3e9ec2924c7d900834d')

  bzDB( { req, res, collection:'bzState', act:"FIND_ONE", query:{_id} }, (data)=>{

    let sendData = (nav)=>{
      res.send({
        ...data,
        object:{
          ...data.object,
          result:{
            ...data.object.result,
            nav:nav
          }
        }
      })
    }

    switch(data?.user?.role){
      case "admin":
        sendData(data.object.result.nav)
        break
      case "master":
        sendData(
          data.object.result.nav.filter(
            el=> (el.role !== 'admin')
          )
        )
        break
      case "user":
        sendData(
          data.object.result.nav.filter(
            el=> (el.role !== 'admin') && (el.role !== 'master')
          )
        )
        break
      default:
        sendData(
          data.object.result.nav.filter(
            el=> el.role === 'guest'
          )
        )
        break
    }
    }
  )

}
