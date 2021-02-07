const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName, generateToken } = require('./../safe/safe')

exports.statistic = (req, res)=>{

  let bzToken = req.body.bzToken
  let user = req.body.user
  let from = req.body.from
  let IP = req.body.IP

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ console.log("can't connect to the DB") }
    else{

        if( !IP ){ IP = "undefined" }
    
        client.db(dbName).collection('bzAuth').insertOne( {bzToken, user, from, IP} )
    
        res.send( {bzToken, user} )

    }
  })

}
