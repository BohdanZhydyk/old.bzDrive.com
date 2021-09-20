const { chkToken } = require('./../functions/chkToken')
const { putStatistic } = require('./../functions/putStatistic')

const { getState } = require('./../routes/getState')
const { auth }	= require('./../routes/auth/auth')
const { office }	= require('./../routes/office')
const { workshop }	= require('./../routes/workshop')
const { news }	= require('./../routes/news')
const { statistic }	= require('./../routes/statistic')

exports.POST = (req, res)=>{

  let InData = {
    Errors: [],
    link: req.body.link,
    bzToken: req.body.bzToken,
    user: req.body.user,
    IP: req.body.IP,
    object: req.body.object
  }

  chkToken(InData, (InData)=>{

    switch(InData.link){
      case "/auth":       auth(req, res, InData, (data)=> send(data) );                 break;

      case "/drive":      getState('/drive', req, res, InData, (data)=> send(data) );   break;
      case "/cv":         getState('/cv', req, res, InData, (data)=> send(data) );      break;

      case "/news":       news(req, res, InData, (data)=> send(data) );                 break;
      case "/office":     office(req, res, InData, (data)=> send(data) );               break;
      case "/workshop":   workshop(req, res, InData, (data)=> send(data) );             break;
      case "/statistic":  statistic(req, res, InData, (data)=> send(data) );            break;
      default: break
    }

    function send(serverData){

      res.send(serverData)

      putStatistic({
        link: serverData.link,
        bzToken: serverData.bzToken,
        user: serverData.user,
        IP: serverData.IP
      })

    }
    
  })

}