const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID
const axios = require('axios')

const { bzDB } = require('./../../bzDB')
const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')
const { getRandomInt } = require('./../../functions')
const { emailPass } = require('./../../safe/safe')
const { EmailBody } = require('./EmailBody')

exports.forgot = (req, res, ServerData, callback)=>{

  // console.log('forgot')
  // return

  let lang = ServerData.user.lang
  let object = ServerData.object
	let inputs = object.inputs

  if(inputs[0].name === 'confirm'){

    let confirm = inputs[0].val
    let bzToken = req.body.bzToken

    bzDB( { req, res, col:'bzUsersConfirm', act:"FIND", query:{bzToken} }, (confirmData)=>{

      let ConfRes = confirmData.object.result[0]

      bzPassCompare( confirm, ConfRes.code, (isPass)=>{

        if(!isPass){
          res.send({
            ...ServerData,
            object:{
              result:{
                inputs: inputs.map( el=> el.name === "confirm" ? {...el, error:13} : {...el})
              },
              errors:false
            }
          })
          return
        }

        let email = ConfRes.email

        bzDB( { req, res, col:'bzUsers', act:"FIND", query:{email} }, (userData)=>{

          let UserRes = userData.object.result[0]

          let id = UserRes._id
          let login = UserRes.login
          let email = UserRes.email
          let role = UserRes.role
          let lang = UserRes.lang
          let sex = UserRes.sex
          let ava = UserRes.ava
          let pass = ConfRes.pass
  
          let query = {_id:id, login, email, role, lang, sex, ava, pass}
  
          bzDB( { req, res, col:'bzUsers', act:"UPDATE_ONE", query }, (dbData)=>{
  
            res.send({
              ...ServerData,
              object:{
                result:{
                  user:{login, role, email, lang, sex, ava}
                },
                errors:false
              }
            })
  
            bzDB( { req, res, col:'bzUsersConfirm', act:"DELETE_ONE", query:{bzToken} }, (confirmData)=>{})
  
          })

        })

      })

    })

    return

  }

  let email = inputs.filter( el=> el.name === "email" )[0].val
	let pass1 = inputs.filter( el=> el.name === "pass1" )[0].val
  let pass2 = inputs.filter( el=> el.name === "pass2" )[0].val

  let confirmTime = 120000 // 5 minutes
  let deleteUnix = { "unix":{ $lte:(Date.now() - confirmTime) } }

  bzDB( { req, res, col:'bzUsersConfirm', act:"DELETE_MANY", query:deleteUnix }, (deleteManyData)=>{

    bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{email} }, (userData)=>{

      if(!userData.object.result){
        res.send({
          ...ServerData,
          object:{
            result:{
              inputs: inputs.map( el=> el.name === "email" ? {...el, error:14} : {...el})
            },
            errors:false
          }
        })
        return
      }

      if(pass1 === "" || pass2 === "" || pass1 !== pass2){
        res.send({
          ...ServerData,
          object:{
            result:{
              inputs: inputs.map( el=> (el.name === "pass1" || el.name === "pass2") ? {...el, error:12} : {...el})
            },
            errors:false
          }
        })
        return
      }

      let code = getRandomInt(100000000, 1000000000)

      bzPassHash( pass1, (passHash)=>{

        bzPassHash( code, (codeHash)=>{

          let Request = req.body

          let login = userData.object.result.login
          let role = userData.object.result.role
          let email = userData.object.result.email
          let lang = userData.object.result.lang
          let sex = userData.object.result.sex
          let ava = userData.object.result.ava

          let query = {
            login, role, email, lang, sex, ava,
            code: codeHash,
            pass: passHash,
            bzToken: Request.bzToken,
            unix: Date.now()
          }

          bzDB( { req, res, col:'bzUsersConfirm', act:"INSERT_ONE", query }, (insertData)=>{

            let mode = "forgot"

            let emailData = JSON.parse(JSON.stringify(
              {
                pass: emailPass,
                from: "admin@bzdrive.com",
                to: email,
                theme: "bzDrive - Forgot code...",
                msg: EmailBody({mode, email, login, lang, code})
              }
            ))

            axios.post( 'https://bz83.usermd.net/', emailData ).then( (bzMailData)=>{

              if(bzMailData.status === 200){

                let confirmData = {
                  name:"confirm",
                  type:"text",
                  val:"",
                  error:false,
                  confirm:{
                    txt: "Confirm time: ",
                    unix: confirmTime
                  }
                }

                res.send({
                  ...ServerData,
                  object:{
                    result:{ inputs: [confirmData] },
                    errors:false
                  }
                })
                console.log("mail sent...")
                return
              }
              
              console.log("mail not sent!!!")

            }).catch( (err)=> console.log('err',err) )
          })

        })

      })

    })

  })






  return

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