
const { login } = require('./login')
const { signin } = require('./signin')
const { forgot } = require('./forgot')


exports.auth = (req, res)=>{

	let ServerData = {
    bzToken: req.body.bzToken,
    IP: req.body.IP,
    user: req.body.user,
    object: req.body.object,
  }
	
	switch( req.body.object.form ){
		case "login": 	login(req, res, ServerData); 		break
		case "signin": 	signin(req, res, ServerData); 	break
		case "forgot": 	forgot(req, res, ServerData); 	break
		default:
			res.send( {...ServerData, object:{result:false, errors:'ERR: server app.js!!!'} } )
			break
	}

}