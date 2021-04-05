const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName, generateToken } = require('./../safe/safe')


exports.chkToken = (InData, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{

    if(error){ InData.Errors.push( error ); callback(InData); return; }

    let bzTokenLen = 64

    if(!InData.bzToken || InData.bzToken.length !== bzTokenLen){
      InData = {
        ...InData,
        bzToken: generateToken(bzTokenLen)
      }
    }

    let getLang = ()=>{      
      switch( InData.IP.country_code ? InData.IP.country_code.toLowerCase() : 'en' ){
        case "ua": return 'ua'
        case "pl": return 'pl'
        case "ru": return 'ru'
        default: return 'en'
      }
    }

    client.db(dbName)
      .collection('statistic')
      .find({bzToken:InData.bzToken})
      .sort({_id:-1})
      .limit(1)
      .toArray( (error, result)=>{
    
      if(error){ InData.Errors.push( error ); callback(InData); return; }
        
      if(result[0]){
        InData = {
          ...InData,
          bzToken: result[0].bzToken,
          user: result[0].user
        }
      }

      if(!InData.user || InData.user === undefined || InData.user === 'undefined'){
        InData = {
          ...InData,
          user: {role:"guest", login:false, lang:getLang(), sex:false, ava:false}
        }
      }
      
      callback(InData)

    })

  })

}
