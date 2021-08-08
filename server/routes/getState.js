const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')
const { Err, Out } = require('./../InOut/Out')


exports.getState = (link, req, res, InData, callback)=>{

  let id

  switch(link){
    case "/drive":    id = '605918e6ec292437d800834d'; break;
    case "/cv":       id = '602a8ad3ec29245f3000834d'; break;
    default: break;
  }

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{

    error && callback( Err(InData, error) )

    // GET STATE
    client.db(dbName)
      .collection('state')
      .findOne( { _id: new ObjectID(id)}, (error, result)=>{
        error && callback( Err(InData, error) )
        callback( Out(InData, result) )
    })

  })
  
}