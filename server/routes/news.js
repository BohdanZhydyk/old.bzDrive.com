const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')


exports.news = (req, res, InData, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    
    if(error){ InData.Errors.push( error ); callback(InData); return; }

    // ADD
    InData.object.add &&
    client.db(dbName).collection('bz_news').insertOne(InData.object.data)

    //DELETE
    InData.object.delete &&
    client.db(dbName).collection('bz_news').deleteOne({_id: new ObjectID(InData.object.data)})

    //GET ALL
    client.db(dbName).collection('bz_news').find({}).sort({_id:-1}).toArray( (error, result)=>{
      
      if(error){ InData.Errors.push( error ); callback(InData); return; }

      callback({
        Errors: InData.Errors,
        link: InData.link,
        bzToken: InData.bzToken,
        user: InData.user,
        IP: InData.IP,
        serverData: result
      })

    })

  })
  
}