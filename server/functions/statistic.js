const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName, generateToken } = require('./../safe/safe')

exports.statistic = (req, res)=>{

  let bzToken = req.body.bzToken
  let user = req.body.user
  let IP = req.body.IP

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{

    if (error){ console.log("can't connect to the DB") }
    else{
      client.db(dbName).collection('statistic').insertOne( {bzToken, user, IP} )
      res.send( {bzToken, user} )
    }
  })

}
