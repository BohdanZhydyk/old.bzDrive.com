const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName, generateToken } = require('./../safe/safe')

exports.statistic = (bzToken, from, IP, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ console.log("can't connect to the DB") }
    else{
    
      client.db(dbName).collection('bzAuth').findOne( {bzToken}, (error, result)=>{
        if(error){ if(error){ console.log(error) } }
        else{
          if(result){
            bzToken = result.bzToken
            USER = result.USER
          }
          else{
            bzToken = generateToken(64)
            USER = {
              login: "man",
              role: "guest",
              lang: false,
              sex: false,
              ava: false
            }
          }
        }
    
        if( !IP ){ IP = "undefined" }
    
        client.db(dbName).collection('bzAuth').insertOne( {bzToken, from, USER, IP} )
    
        callback( {bzToken, USER} )
      })

    }
  })

}
