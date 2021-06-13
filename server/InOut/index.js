const { GET } = require('./GET')
const { POST } = require('./POST')


exports.InOut = async (path, req, res)=>{

  // req.headers.cookie
  // req.route.path
  // req.query
  // req.method

  if(req.method){

    if(req.method === "GET"){ GET(path, req, res) }

    if(req.method === "POST"){ POST(req, res) }

  }

}