const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')


exports.getState = (req, res)=>{

  let _id = new ObjectID('61dca3e9ec2924c7d900834d')

  bzDB( { req, res, collection:'bzState', act:"FIND_ONE", query:{_id} }, (data)=>{

    let Filter = (nav, lvl)=>{
      let arr = []
      arr = nav.filter( el=> (el.lvl <= lvl) )
      res.send({
        ...data,
        object:{
          ...data.object,
          result:{
            ...data.object.result,
            nav: arr.map( el=> el.subnav
              ? {...el, subnav:el.subnav.filter( el=> (el.lvl <= lvl) )}
              : el
            )
          }
        }
      })
    }

    let nav = data.object.result.nav

    switch(data?.user?.role){
      case "admin":   Filter( nav, 3 );     break
      case "master":  Filter( nav, 2 );     break
      case "user":    Filter( nav, 1 );     break
      default:        Filter( nav, 0 );     break
    }

  })

}
