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
    
      client.db(dbName).collection('bzAuth').findOne( {bzToken}, (error, result)=>{
        if(error){ if(error){ console.log(error) } }
        else{
          if(result){
            bzToken = result.bzToken
            user = result.user
          }
          else{
            bzToken = generateToken(64)
            user = {
              login: "man",
              role: "guest",
              lang: false,
              sex: false,
              ava: false
            }
          }
        }
    
        if( !IP ){ IP = "undefined" }
    
        client.db(dbName).collection('bzAuth').insertOne( {bzToken, user, from, IP} )
    
        res.send( {bzToken, user} )
      })

    }
  })

}
