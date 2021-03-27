const mongo = require('mongodb')
const mongoClient = mongo.MongoClient

const { url, dbName } = require('./../../safe/safe')
const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')


exports.login = (login, pass, msg, callback)=>{
  
  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    if (error){ callback({ err:error, res:false }) }
    else{
      console.log('db',login )
      client.db(dbName).collection('bzUsers').findOne({ login }, (error, result)=>{
        if(error){ callback({ err:error, res:false }) }
        else{
          if(!result){
            callback({ err:false, res:{...msg, login: ` - niema takiego usera w bazie danych!`} })
          }
          else{
            bzPassCompare(pass, result.pass, (data)=>{ 
              if( !data ){
                callback({ err:false, res:{...msg, pass: ` - wprowadzone nieprawidlowe haslo!`} })
              }
              else{

                let user = {
                  role: result.role,
                  login: result.login,
                  lang: result.lang,
                  sex: result.sex,
                  ava: result.ava
                }

                let nav = [
                  {to: "/profile", name: "Profile"}
                ]

                if( result.role === "admin" ){
                  nav = [
                    ...nav,
                    {to: "/statistic", name: "Statistic"}
                  ]
                }

                callback({err:false, user, nav})
                
              }
            })
          }
        }
      })
    }
  })

}