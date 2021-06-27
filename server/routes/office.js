const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')


exports.office = (req, res, InData, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    
    if(error){ InData.Errors.push( error ); callback(InData); return; }

    //GET DEALER
    InData.object.getDealer &&
    client.db(dbName).collection(`baseSP`).find({dealer:InData.object.user}).sort({_id:-1}).toArray( (error, result)=>{
      
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

    //GET ALL
    InData.object.get &&
    client.db(dbName).collection(`base${InData.object.get}`).find({}).sort({_id:-1}).toArray( (error, result)=>{
      
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