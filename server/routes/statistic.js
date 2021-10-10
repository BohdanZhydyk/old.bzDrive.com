const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')
const { Err, Out } = require('./../InOut/Out')


exports.statistic = (req, res, InData, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    
    error && callback( Err(InData, error) )

    //GET ALL
    client.db(dbName)
      .collection('statistic')
      .find({}).sort({_id:-1})
      // .limit(2)
      .toArray( (error, result)=>{
        error && callback( Err(InData, error) )
        callback( Out(InData, result) )
    })

  })
  
}