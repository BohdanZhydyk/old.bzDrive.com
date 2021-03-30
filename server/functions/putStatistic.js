const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName, generateToken } = require('./../safe/safe')


exports.putStatistic = (statData)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{

    if(error){ console.log(error) }
    
    client.db(dbName).collection('statistic').insertOne(statData)

  })

}
