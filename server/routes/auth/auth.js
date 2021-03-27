const { login } = require('./login')


exports.auth = (req, res, callback)=>{

  let form  = req.body.object.form
  let object = req.body.object

  let Validator = async (object)=>{

    let msg = {
      form: form,
      login: false,
      email: false,
      pass: false,
      pass1: false,
      pass2: false
    }

    let isEmail = (err, value)=>{
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return !re.test(value)
      ? ` - wprowadzono nieprawidłowy e-mail!`
      : err
    }

    let isAlphanumeric = (err, value)=>{
      return !value.match(/^[0-9A-Za-z]+$/)
      ? ` - musi zawierać cyfry 0-9 i litery A-Z a-z!`
      : err
    }

    let isLength = (err, value, min, max)=>{
      return value.length < min || value.length > max
      ? ` - musi zawierać od ${min} do ${max} znaków!`
      : err
    }

    let isEmpty = (err, value)=>{
      return value.length < 1
      ? ` - wypełnij dane pole!`
      : err
    }

    if(object.login !== undefined){
      let step1 = await isAlphanumeric(msg.login, object.login)
      let step2 = await isLength(step1, object.login, 4, 8)
      msg.login = await isEmpty(step2, object.login)
    }

    if(object.email !== undefined){
      let step1 = await isEmail(msg.email, object.email)
      msg.email = await isEmpty(step1, object.email)
    }

    if(object.pass !== undefined){
      let step1 = await isAlphanumeric(msg.pass, object.pass)
      let step2 = await isLength(step1, object.pass, 8, 16)
      msg.pass = await isEmpty(step2, object.pass)
    }

    if(object.pass1 !== undefined){
      let step1 = await isAlphanumeric(msg.pass1, object.pass1)
      let step2 = await isLength(step1, object.pass1, 8, 16)
      msg.pass1 = await isEmpty(step2, object.pass1)
    }

    if(object.pass2 !== undefined){
      let step1 = await isAlphanumeric(msg.pass2, object.pass2)
      let step2 = await isLength(step1, object.pass2, 8, 16)
      msg.pass2 = await isEmpty(step2, object.pass2)
    }

    setTimeout(function(){
      if(form === "login" && !msg.login && !msg.pass){
        login(object.login, object.pass, msg, (data)=>{
          callback({ err:data.err, result:data })
          console.log(data)
        })
      }
      else if(form === "signin" && !msg.login && !msg.email && !msg.pass1 && !msg.pass2){
        msg.form = form
        msg.ok = true
        msg.msg = "signin OK"
      }
      else if(form === "forgot" && !msg.email && !msg.pass1 && !msg.pass2){
        msg.form = form
        msg.ok = true
        msg.msg = "forgot OK"
      }
      else{
        callback({ err:false, result:{msg} })
      }
      
    }, 500)
    
  }

  Validator(object)

}
