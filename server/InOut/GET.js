
exports.GET = (path, req, res)=>{

  let query = req.query
  
  switch(path){
    case "/":
      res.send( `error! { msg: no file index.html, query: ${ JSON.stringify(query) } }` )
      break
    default: break
  }

}