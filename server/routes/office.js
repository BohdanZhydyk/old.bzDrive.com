const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')


exports.office = (req, res, InData, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    
    if(error){ InData.Errors.push( error ); callback(InData); return; }

    // GET STATE
    InData.object.getState &&
    mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
  
      if(error){ InData.Errors.push( error ); callback(InData); return; }
  
      client.db(dbName)
        .collection('state')
        .findOne( { _id: new ObjectID('60c6294fec2924b23c00834d')}, (error, result)=>{
  
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

    //GET MODE
    InData.object.getMode &&
    client.db(dbName).collection(`base${InData.object.getMode}`).find({}).sort({_id:-1}).toArray( (error, result)=>{

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
    
    //ADD INVOICE
    InData.object.addInvoice &&
    client.db(dbName).collection(`baseSP`).find({user:InData.object.addInvoice}).sort({_id:-1}).toArray( (error, result)=>{
      
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