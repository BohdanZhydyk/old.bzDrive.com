const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID


const { url, dbName } = require('./../../safe/safe')
const { Err, Out } = require('./../../InOut/Out')
const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')


exports.login = async (InData, callback)=>{
  
  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{

    error && callback( Err(InData, error) )

    client.db(dbName)
      .collection('bzUsers')
      .findOne({ login:InData.authData.login.val }, (error, result)=>{
      
      error && callback( Err(InData, error) )

      if(!result){
        callback({
          ...InData,
          authData:{
            ...InData.authData,
            login:{
              ...InData.authData.login,
              error: {nr:4}
            }
          }
        })
        return
      }
      
      bzPassCompare( InData.authData.pass.val, result.pass, (data)=>{

        if(!data){
          callback({
            ...InData,
            authData:{
              ...InData.authData,
              pass:{
                ...InData.authData.pass,
                error: {nr:5}
              }
            }
          })
          return
        }

        callback({
          ...InData,
          user:{
            role: result.role,
            login: result.login,
            lang: result.lang,
            sex: result.sex,
            ava: result.ava
          }
        })

      })

    })

  })

}