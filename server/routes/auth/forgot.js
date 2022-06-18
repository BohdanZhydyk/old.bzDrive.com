const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../../bzDB')
const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')

exports.forgot = (req, res, ServerData, callback)=>{

  console.log('forgot')
  return

  let object = ServerData.object

	let inputs = object.inputs

	let login = inputs.filter( el=> el.name === "login" )[0].val
	let pass = inputs.filter( el=> el.name === "pass" )[0].val

  bzDB(
    { req, res, collection:'bzUsers', act:"FIND_ONE", query:{login} },
    (dbData)=>{

      if(!dbData?.object?.result){
        res.send({
          ...ServerData,
          object:{
            result:{
              inputs: inputs.map( el=> el.name === "login" ? {...el, error:6} : {...el})
            },
            errors:false
          }
        })
        return
      }
      
      bzPassCompare( pass, dbData.object.result.pass, (isPass)=>{

        if(!isPass){
          res.send({
            ...ServerData,
            object:{
              result:{
                inputs: inputs.map( el=> el.name === "pass" ? {...el, error:7} : {...el})
              },
              errors:false
            }
          })
          return
        }

        res.send({
          ...ServerData,
          object:{
            result:{
              user:{
                role: dbData.object.result.role,
                login: dbData.object.result.login,
                email: dbData.object.result.email,
                lang: dbData.object.result.lang,
                sex: dbData.object.result.sex,
                ava: dbData.object.result.ava
              }
            },
            errors:false
          }
        })

      })

    }
  )

}