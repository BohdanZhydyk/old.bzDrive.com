const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName, generateToken } = require('./safe/safe')
const { unixToDateTimeConverter } = require('./functions')


exports.bzDB = (
  {
    req,              // request
    res,              // response
    collection,       // name of db collection
    act,              // action FIND, FIND_ONE, ...
    query,            // query of search
    sort = {_id:-1}   // sort of search
  },
  callback        // callback function
  )=>{

  let bzToken = req?.body?.bzToken ? req.body.bzToken : generateToken()
  let IP = req?.body?.IP ? req.body.IP : 'No IP...'
  let user = req?.body?.user ? req.body.user : false
  let object = req.body.object

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{

    error && callback( {bzToken, IP, user, object:{result:false, errors:error}} )

    function Queries(bzToken, IP, user){

      function FIND(){
        client.db(dbName)
          .collection(collection)
          .find(query).sort(sort)
          .toArray( (error, result)=>{
            error
            ? callback( {bzToken, IP, user, object:{result:false, errors:error}} )
            : callback( {bzToken, IP, user, object:{result:result, errors:false}} )
        })
      }
  
      function FIND_ONE(){
        client.db(dbName)
          .collection(collection)
          .findOne( query, (error, result)=>{
            error
            ? callback( {bzToken, IP, user, object:{result:false, errors:error}} )
            : callback( {bzToken, IP, user, object:{result:result, errors:false}} )
        })
      }
  
      function INSERT_ONE(){
        client.db(dbName)
          .collection(collection)
          .insertOne( query, (error, result)=>{
            error
            ? callback( {bzToken, IP, user, object:{result:false, errors:error}} )
            : callback( {bzToken, IP, user, object:{result:result, errors:false}} )
        })
      }
  
      function UPDATE_ONE(){
        client.db(dbName)
          .collection(collection)
          .updateOne(
            { _id: query._id },
            {$set: query },
            {upsert:true}, (error, result)=>{
              error
              ? callback( {bzToken, IP, user, object:{result:false, errors:error}} )
              : callback( {bzToken, IP, user, object:{result:result, errors:false}} )
        })
      }
  
      function DELETE_ONE(){
        client.db(dbName)
          .collection(collection)
          .deleteOne( query, (error, result)=>{
            error
            ? callback( {bzToken, IP, user, object:{result:false, errors:error}} )
            : callback( {bzToken, IP, user, object:{result:result, errors:false}} )
        })
      }

      function DELETE_MANY(){
        client.db(dbName)
          .collection(collection)
          .deleteMany( query, (error, result)=>{
            error
            ? callback( {bzToken, IP, user, object:{result:false, errors:error}} )
            : callback( {bzToken, IP, user, object:{result:result, errors:false}} )
        })
      }
      
      switch(act){
        case "FIND":          FIND();         break
        case "FIND_ONE":      FIND_ONE();     break
        case "INSERT_ONE":    INSERT_ONE();   break
        case "UPDATE_ONE":    UPDATE_ONE();   break
        case "DELETE_ONE":    DELETE_ONE();   break
        case "DELETE_MANY":   DELETE_MANY();  break
        default: break
      }

    }

    function Statistic(bzToken, IP, user){
      let date = { unix: Date.now(), dateTime: unixToDateTimeConverter() }
      user = {
        login:user.login,
        role:user.role,
        email:user.email,
        lang:user.lang,
        sex:user.sex,
        ava:user.ava
      }
      client.db(dbName)
        .collection('bzStatistic')
        .insertOne( {user, IP, date, bzToken}, (error, result)=>{
          error && callback( {bzToken, IP, user, object:{result:false, errors:error}} )
      })
    }

    function CheckToken(bzToken, CheckTokenCallback){
      client.db(dbName)
        .collection('bzStatistic')
        .findOne( {bzToken}, (error, result)=>{
          error && callback( {bzToken, IP, user, object:{result:false, errors:error}} )
          CheckTokenCallback(result)
      })
    }

    function CheckRole(login, CheckRoleCallback){
      client.db(dbName)
        .collection('bzUsers')
        .findOne( {login}, (error, result)=>{
          let userRes = {
            login: result?.login,
            role: result?.role,
            email: result?.email,
            lang: result?.lang,
            sex: result?.sex,
            ava: result?.ava
          }
          error && callback( {bzToken, IP, user:userRes, object:{result:false, errors:error}} )
          CheckRoleCallback(userRes)
      })
    }

    CheckToken(bzToken, (ChekTokenData)=>{
  
      if(!ChekTokenData){
        bzToken = generateToken()
        user = false
        Queries(bzToken, IP, user)
        Statistic(bzToken, IP, user)
        return
      }
      
      CheckRole(user?.login, (CheckRoleCallback)=>{

        if(!CheckRoleCallback){
          Queries(bzToken, IP, user)
          Statistic(bzToken, IP, user)
          return
        }
        
        user = CheckRoleCallback
        Queries(bzToken, IP, user)
        Statistic(bzToken, IP, user)

      })

    })

  })
  
}