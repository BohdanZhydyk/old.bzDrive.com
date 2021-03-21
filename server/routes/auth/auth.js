const { check, validationResult } = require('express-validator');

const { login } = require('./login')


exports.auth = (req, res, callback)=>{

  const errValid = validationResult(req)

  let form  = req.body.form
  let object = req.body.object

  let Validator = async (object)=>{

    let err = {
      login: false,
      pass: false
    }

    let isAlphanumeric = (variable, value, callback)=>{
      (!value.match(/^[0-9A-Za-z]+$/))
      ? callback(` - może zawierać cyfry 0-9 i litery A-Z a-z!`)
      : callback(false)
    }

    let isLength = (variable, value, min, max, callback)=>{
      (value.length < min || value.Length > max)
      ? callback(` - musi zawierać od ${min} do ${max} znaków!`)
      : callback(false)
    }

    let isEmpty = (variable, value, callback)=>{
      (value === "")
      ? callback(` - wypełnij dane pole!`)
      : callback(false)
    }

    
    let login  = object.login
    let pass  = object.pass
    let pass1  = object.pass1
    let pass2  = object.pass2

    console.log("login", "|"+login+"|")
    
    if(object.login !== false){
      // isEmpty("login", object.login, (data)=>{
      //   console.log(data)
        // if(!data){
        //   isLength("login", object.login, 4, 8, (data)=>{
        //     if(!data) isAlphanumeric("login", object.login, (data)=>{
        //       console.log(data)
        //     })
        //   })
        // }
        // else{ console.log(data) }
      // })
    }



    // if(object.pass) isPass(object.pass)
    // if(object.pass1) isPass(object.pass1)
    // if(object.pass2) isPass(object.pass2)
    
    console.log(err)

    
  }

  Validator(object)

  
// 		check('email').isEmail().withMessage(' - wprowadzono nieprawidłowy e-mail!'),
// 		check('email').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
// 		check('pass')	.isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
// 		check('pass')	.isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
// 		check('pass')	.isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
// 		check('pass1').isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
// 		check('pass1').isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
// 		check('pass1').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),
// 		check('pass2').isLength({ min:8, max:16 }).withMessage(' - musi zawierać od 8 do 16 znaków!'),
// 		check('pass2').isAlphanumeric().withMessage(' - może zawierać cyfry 0-9 i litery A-Z a-z!'),
// 		check('pass2').isLength({ min:1 }).withMessage(' - wypełnij dane pole!'),


  // for(let i=0; i<errValid.errors.length; i++){
  //   if( errValid.errors[i].param === "login" 	){ err.login 	= errValid.errors[i].msg }
  //   if( errValid.errors[i].param === "email" 	){ err.email 	= errValid.errors[i].msg }
  //   if( errValid.errors[i].param === "pass" 	){ err.pass 	= errValid.errors[i].msg }
  //   if( errValid.errors[i].param === "pass1" 	){ err.pass1 	= errValid.errors[i].msg }
  //   if( errValid.errors[i].param === "pass2" 	){ err.pass2 	= errValid.errors[i].msg }
  // }

  // if(form === "login" && !err.login && !err.pass){ login(req, res) }
  // else if(form === "signin" && !err.login && !err.email && !err.pass1 && !err.pass2){
  //   err.form = form
  //   err.ok = true
  //   err.msg = "signin OK"
  // }
  // else if(form === "forgot" && !err.email && !err.pass1 && !err.pass2){
  //   err.form = form
  //   err.ok = true
  //   err.msg = "forgot OK"
  // }
  // else{
  //   res.send( {err} )
  // }

  // console.log(err)

}
