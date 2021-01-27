const { check, validationResult } = require('express-validator');

const { statistic } = require('../../functions/statistic')
const { login } = require('./login')


exports.auth = (req, res)=>{

  statistic( req.body.bzToken, req.body.from, req.body.IP, (data)=>{

    let bzToken = data.bzToken
    const errValid = validationResult(req)
    let err = {}

    for(let i=0; i<errValid.errors.length; i++){
      if( errValid.errors[i].param === "login" 	){ err.login 	= errValid.errors[i].msg }
      if( errValid.errors[i].param === "email" 	){ err.email 	= errValid.errors[i].msg }
      if( errValid.errors[i].param === "pass" 	){ err.pass 	= errValid.errors[i].msg }
      if( errValid.errors[i].param === "pass1" 	){ err.pass1 	= errValid.errors[i].msg }
      if( errValid.errors[i].param === "pass2" 	){ err.pass2 	= errValid.errors[i].msg }
    }
  
    if(req.body.form === "login" && !err.login && !err.pass){
      login(req, res, (data)=>{
        res.send( {err:data.err, bzToken, USER:data.USER} )
      })
    }
    else if(req.body.form === "signin" && !err.login && !err.email && !err.pass1 && !err.pass2){
      err.form = req.body.form
      err.ok = true
      err.msg = "signin OK"
    }
    else if(req.body.form === "forgot" && !err.email && !err.pass1 && !err.pass2){
      err.form = req.body.form
      err.ok = true
      err.msg = "forgot OK"
    }
    else{
      res.send( {err, bzToken: data.bzToken, USER: data.USER} )
    }
  
    // console.log('body', req.body)
    // console.log('data', data)
    // console.log('err', err)

  })

}
