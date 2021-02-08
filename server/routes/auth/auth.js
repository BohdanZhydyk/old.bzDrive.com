const { check, validationResult } = require('express-validator');

const { login } = require('./login')


exports.auth = (req, res)=>{

  console.log('auth', req.body)

  let form = req.body.form
  const errValid = validationResult(req)
  let err = {}

  for(let i=0; i<errValid.errors.length; i++){
    if( errValid.errors[i].param === "login" 	){ err.login 	= errValid.errors[i].msg }
    if( errValid.errors[i].param === "email" 	){ err.email 	= errValid.errors[i].msg }
    if( errValid.errors[i].param === "pass" 	){ err.pass 	= errValid.errors[i].msg }
    if( errValid.errors[i].param === "pass1" 	){ err.pass1 	= errValid.errors[i].msg }
    if( errValid.errors[i].param === "pass2" 	){ err.pass2 	= errValid.errors[i].msg }
  }

  if(form === "login" && !err.login && !err.pass){ login(req, res) }
  else if(form === "signin" && !err.login && !err.email && !err.pass1 && !err.pass2){
    err.form = form
    err.ok = true
    err.msg = "signin OK"
  }
  else if(form === "forgot" && !err.email && !err.pass1 && !err.pass2){
    err.form = form
    err.ok = true
    err.msg = "forgot OK"
  }
  else{
    res.send( {err} )
  }

}
