const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')


exports.getState = (link, req, res, InData, callback)=>{

  let id

  switch(link){
    case "/drive":    id = '605918e6ec292437d800834d'; break;
    case "/cv":       id = '602a8ad3ec29245f3000834d'; break;
    default: break;
  }

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{

    if(error){ InData.Errors.push( error ); callback(InData); return; }

    client.db(dbName).collection('state').findOne( { _id: new ObjectID(id)}, (error, result)=>{

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