const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName, generateToken } = require('./../safe/safe')


exports.putStatistic = (data)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{

    if (error){ console.log(error) }
    else{
      client.db(dbName).collection('statistic').insertOne(
        {
          link: data.link,
          bzToken: data.bzToken,
          user: data.user,
          IP: data.IP,
          object: data.object
        }
      )
    }
  })

}
