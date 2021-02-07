const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName, generateToken } = require('./../safe/safe')

exports.chkToken = (req, res)=>{

  let bzToken = req.body.bzToken
  let user = req.body.user
  let from = req.body.from
  let IP = req.body.IP

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ console.log("can't connect to the DB") }
    else{
    
      client.db(dbName).collection('bzAuth').find({bzToken}).sort({_id:-1}).limit(1).toArray( (error, result)=>{
        
        if(error){ if(error){ console.log(error) } }
        else{

          if(!result[0]){
            bzToken = generateToken(64)
            user = {login: "man", role: "guest", lang: false, sex: false, ava: false}
          }
          else{
            bzToken = result[0].bzToken
            user = result[0].user
          }

          if( !IP ){ IP = "undefined" }
        }
    
        client.db(dbName).collection('bzAuth').insertOne( {bzToken, user, from, IP} )
    
        res.send( {bzToken, user} )
      })

    }
  })

}
