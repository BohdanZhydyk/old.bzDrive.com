const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName } = require('./../safe/safe')


exports.news = (req, res, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ callback({ err:error, res:false }) }
    else{

      client.db(dbName).collection('bz_news').find({}).toArray( (error, result)=>{
        if(error){ callback({ err:error, res:false }) }
        else{ callback({ err:false, res:result }) }
      })

    }
  })
  
}