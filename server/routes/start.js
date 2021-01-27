const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')
const { statistic } = require('./../functions/statistic')


exports.start = (req, res)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ console.log("can't connect to the DB") }
    else{

      statistic( req.body.bzToken, req.body.from, req.body.IP, (data)=>{

        client.db(dbName).collection('startData').findOne(
          { _id: new ObjectID('5fe7f755ec292415da008350')},
          (error, result)=>{

          if(error){ console.log(error) }
          else{ res.send( {result, bzToken: data.bzToken, USER: data.USER} ) }
          
        })

      })

    }
  })
  
}