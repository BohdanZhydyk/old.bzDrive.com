const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName, generateToken } = require('./../safe/safe')

exports.chkToken = (req, res)=>{

  let bzToken = req.body.bzToken
  let user = req.body.user

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ console.log("can't connect to the DB") }
    else{
    
      client.db(dbName).collection('statistic').find({bzToken}).sort({_id:-1}).limit(1).toArray( (error, result)=>{
        
        if(error){
          console.log(error)
        }
        else{
          if(result[0])
            res.send( {bzToken:result[0].bzToken, user:result[0].user} )
          else
            res.send( {bzToken:generateToken(64), user} )
        }

      })

    }
  })

}
