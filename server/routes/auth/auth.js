const { login } = require('./login')


exports.auth = async (req, res, InData, callback)=>{

  InData = {
    Errors: InData.Errors,
    link: InData.link,
    bzToken: InData.bzToken,
    user: InData.user,
    IP: InData.IP,
    authData: {
      form: InData.object.form,
      login: {val: InData.object.login, error: false},
      email: {val: InData.object.email, error: false},
      pass: {val: InData.object.pass, error: false},
      pass1: {val: InData.object.pass1, error: false},
      pass2: {val: InData.object.pass2, error: false}
    }
  }

  function isEmail(obj){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !re.test(obj.val) ? {...obj, error: {nr:0} } : obj
  }

  function isAlphanumeric(obj){
    return !obj.val.match(/^[0-9A-Za-z]+$/) ? {...obj, error: {nr:1} } : obj
  }

  function isLength(obj, min, max){
    return obj.val.length < min || obj.val.length > max ? {...obj, error: {nr:2, min, max} } : obj
  }

  function isEmpty(obj){
    return obj.val.length < 1 ? {...obj, error: {nr:3} } : obj
  }

  if(InData.authData.login.val !== undefined){
    InData.authData.login = await isAlphanumeric(InData.authData.login)
    InData.authData.login = await isLength(InData.authData.login, 4, 8)
    InData.authData.login = await isEmpty(InData.authData.login)
  }

  if(InData.authData.email.val !== undefined){
    InData.authData.email = await isEmail(InData.authData.email)
    InData.authData.email = await isEmpty(InData.authData.email)
  }

  if(InData.authData.pass.val !== undefined){
    InData.authData.pass = await isAlphanumeric(InData.authData.pass)
    InData.authData.pass = await isLength(InData.authData.pass, 8, 16)
    InData.authData.pass = await isEmpty(InData.authData.pass)
  }

  if(InData.authData.pass1.val !== undefined){
    InData.authData.pass1 = await isAlphanumeric(InData.authData.pass1)
    InData.authData.pass1 = await isLength(InData.authData.pass1, 8, 16)
    InData.authData.pass1 = await isEmpty(InData.authData.pass1)
  }

  if(InData.authData.pass2.val !== undefined){
    InData.authData.pass2 = await isAlphanumeric(InData.authData.pass2)
    InData.authData.pass2 = await isLength(InData.authData.pass2, 8, 16)
    InData.authData.pass2 = await isEmpty(InData.authData.pass2)
  }

  if(InData.authData.form === "login" && !InData.authData.login.error && !InData.authData.login.error){
    login(InData, (data)=>{
      callback({
        Errors: data.Errors,
        link: data.link,
        bzToken: data.bzToken,
        user: data.user,
        IP: data.IP,
        serverData: data.authData
      })
    })
  }
  else{
    callback({
      Errors: InData.Errors,
      link: InData.link,
      bzToken: InData.bzToken,
      user: InData.user,
      IP: InData.IP,
      serverData: InData.authData
    })
  }

}
