const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')
const { Err, Out } = require('./../InOut/Out')


exports.news = (req, res, InData, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    
    error && callback( Err(InData, error) )

    // ADD
    InData.object.add &&
    client.db(dbName)
      .collection('bz_news')
      .insertOne(InData.object.data, (error, result)=>{
        error && callback( Err(InData, error) )
        callback( Out(InData, result) )
    })

    // SAVE
    InData.object.save &&
    client.db(dbName)
    .collection('bz_news')
    .updateOne(
      {_id: new ObjectID(InData.object.data._id)},
      {
        $set: {
          top: InData.object.data.top,
          content: InData.object.data.content,
          bottom: InData.object.data.bottom
        } 
      },
      {upsert:true}, (error, result)=>{
          error && callback( Err(InData, error) )
          callback( Out(InData, result) )
    })

    //DELETE
    InData.object.delete &&
    client.db(dbName)
      .collection('bz_news')
      .deleteOne({_id: new ObjectID(InData.object.data)}, (error, result)=>{
        error && callback( Err(InData, error) )
        callback( Out(InData, result) )
    })

    //GET ALL
    client.db(dbName)
      .collection('bz_news')
      .find({}).sort({_id:-1})
      .toArray( (error, result)=>{
        error && callback( Err(InData, error) )
        callback( Out(InData, result) )
    })

  })
  
}