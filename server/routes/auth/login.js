const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName } = require('./../../safe/safe')
const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')


exports.login = async (InData, callback)=>{
  
  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    
    if(error){ InData.Errors.push( error ); callback(InData); return; }

    client.db(dbName).collection('bzUsers').findOne({ login:InData.authData.login.val }, (error, result)=>{
      
      if(error){ InData.Errors.push( error ); callback(InData); return; }

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