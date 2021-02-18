const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName, generateToken } = require('./../safe/safe')


exports.chkToken = (InData, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){
      InData.err.push( error )
      callback(InData)
    }
    else{

      let bzToken = InData.bzToken

      client.db(dbName)
        .collection('statistic')
        .find({bzToken})
        .sort({_id:-1})
        .limit(1)
        .toArray( (error, result)=>{
      
        if(error){
          InData.err.push( error )
          callback(InData)
        }
        else{
          
          if(result[0]){
            InData = {
              ...InData,
              bzToken: result[0].bzToken,
              user: result[0].user
            }
          }

          if(!InData.bzToken || InData.bzToken === undefined || InData.bzToken === 'undefined'){
            InData = {
              ...InData,
              bzToken: generateToken(64),
              user: {role:"guest", login: false, lang: false, sex: false, ava: false}
            }
          }
          
          callback(InData)

        }

      })

    }
  })

}
