const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID
const axios = require('axios')

const { bzDB } = require('./../../bzDB')
const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')
const { getRandomInt } = require('./../../functions')
const { emailPass } = require('./../../safe/safe')

exports.signin = (req, res, ServerData, callback)=>{
  
  let object = ServerData.object
	let inputs = object.inputs
  
  if(inputs[0].name === 'confirm'){

    let confirm = inputs[0].val
    let bzToken = req.body.bzToken

    bzDB( { req, res, collection:'bzUsersConfirm', act:"FIND", query:{bzToken} }, (confirmData)=>{

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

        let query = {
          login: ConfRes.login,
          role: ConfRes.role ? ConfRes.role : "user",
          email: ConfRes.email,
          lang: ConfRes.lang ? ConfRes.lang : false,
          sex: ConfRes.sex ? ConfRes.sex : false,
          ava: ConfRes.ava ? ConfRes.ava : false,
          pass: ConfRes.pass
        }

        bzDB( { req, res, collection:'bzUsers', act:"INSERT_ONE", query }, (dbData)=>{

          res.send({
            ...ServerData,
            object:{
              result:{
                user:{
                  login: ConfRes.login,
                  role: ConfRes.role ? ConfRes.role : "user",
                  email: ConfRes.email,
                  lang: ConfRes.lang ? ConfRes.lang : false,
                  sex: ConfRes.sex ? ConfRes.sex : false,
                  ava: ConfRes.ava ? ConfRes.ava : false
                }
              },
              errors:false
            }
          })

          bzDB( { req, res, collection:'bzUsersConfirm', act:"DELETE_ONE", query:{bzToken} }, (confirmData)=>{})

        })

      })

    })

    return

  }
  
	let login = inputs.filter( el=> el.name === "login" )[0].val
  let email = inputs.filter( el=> el.name === "email" )[0].val
	let pass1 = inputs.filter( el=> el.name === "pass1" )[0].val
  let pass2 = inputs.filter( el=> el.name === "pass2" )[0].val
  
  let confirmTime = 120000 // 5 minutes
  let deleteUnix = { "unix":{ $lte:(Date.now() - confirmTime) } }

  bzDB( { req, res, collection:'bzUsersConfirm', act:"DELETE_MANY", query:deleteUnix }, (deleteManyData)=>{
  
    bzDB( { req, res, collection:'bzUsers', act:"FIND_ONE", query:{login} }, (userData)=>{

      bzDB( { req, res, collection:'bzUsersConfirm', act:"FIND_ONE", query:{login} }, (confData)=>{

        if(userData.object.result || confData.object.result){
          res.send({
            ...ServerData,
            object:{
              result:{
                inputs: inputs.map( el=> el.name === "login" ? {...el, error:10} : {...el})
              },
              errors:false
            }
          })
          return
        }

        bzDB( { req, res, collection:'bzUsers', act:"FIND_ONE", query:{email} }, (userData)=>{

          bzDB( { req, res, collection:'bzUsersConfirm', act:"FIND_ONE", query:{email} }, (confData)=>{

            if(userData.object.result || confData.object.result){
              res.send({
                ...ServerData,
                object:{
                  result:{
                    inputs: inputs.map( el=> el.name === "email" ? {...el, error:11} : {...el})
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

                let query = {
                  login: login,
                  role: "user",
                  email: email,
                  code: codeHash,
                  pass: passHash,
                  bzToken: Request.bzToken,
                  lang: Request.user.lang ? Request.user.lang : false,
                  sex: Request.user.sex ? Request.user.sex : false,
                  ava: Request.user.ava ? Request.user.ava : false,
                  unix: Date.now()
                }

                bzDB( { req, res, collection:'bzUsersConfirm', act:"INSERT_ONE", query }, (insertData)=>{

                  let emailData = JSON.parse(JSON.stringify(
                    {
                      emailMode: "SignIn",
                      pass: emailPass,
                      login: login,
                      to: email,
                      from: "admin@bzdrive.com",
                      theme: "bzDrive - SignIn code...",
                      code: code
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

            return

          })

        })

      })

    })

  })

}