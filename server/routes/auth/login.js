const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName } = require('./../../safe/safe')
const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')


exports.login = (req, res)=>{
  
  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ console.log("can't connect to the DB") }
    else{
      client.db(dbName).collection('bzUsers').findOne({ login: req.body.login }, (error, result)=>{
        if(error){ console.log(error) }
        else{
          if(!result){
            res.send( { err: {login: " - niema takiego usera w bazie danych!"} } )
          }
          else{
            bzPassCompare(req.body.pass, result.pass, (data)=>{ 
              if( !data ){
                res.send( { err: {pass: " - wprowadzone nieprawidlowe haslo!"} } )
              }
              else{
                res.send({
                  user: {
                    login: result.login,
                    role: result.role,
                    lang: result.lang,
                    sex: result.sex,
                    ava: result.ava
                  }
                })
              }
            })
          }
        }
      })
    }
  })

}