import axios from 'axios'
import cookies from 'js-cookie'


export const timeConverter = ( unix = new Date(Date.now()) )=>{
  // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  var year = unix.getFullYear()
  var month = unix.getMonth() < 10 ? "0"+unix.getMonth() : unix.getMonth()
  var date = unix.getDate() < 10 ? "0"+unix.getDate() : unix.getDate()
  var hour = unix.getHours() < 10 ? "0"+unix.getHours() : unix.getHours()
  var min = unix.getMinutes() < 10 ? "0"+unix.getMinutes() : unix.getMinutes()
  var sec = unix.getSeconds() < 10 ? "0"+unix.getSeconds() : unix.getSeconds()
  var dateTime = year+'-'+month+'-'+date+' '+hour+':'+min+':'+sec
  return dateTime
}

export const setToken = (bzToken)=> cookies.set('bzToken', bzToken )
export const remToken = ()=> cookies.remove('bzToken')
export const getToken = ()=> cookies.get('bzToken')

export const setUser = (user)=> JSON.stringify( cookies.set('user', user) )
export const remUser = ()=> cookies.remove('user')
export const getUser = ()=> cookies.get('user') ? JSON.parse( cookies.get('user') ) : false


export const errors = (err)=> console.log("ERRORS", err)


export const bzPost = async ( link, object, callback )=>{

  let OutData = {
    Errors: [],
    link: link,
    bzToken: getToken(),
    IP: false,
    user: false,
    object: object
  }

  // let href = window.location.href
  let hostname = window.location.hostname

  let api

  hostname === 'localhost'
  ? api = 'http://localhost:5000'
  : api = 'https://bzdrive.com'

  OutData.IP = await axios.get('https://json.geoiplookup.io').then( (res)=> {

    return {
      host: hostname,
      from: link,
      ip: res.data.ip,
      postal_code: res.data.postal_code,
      country_code: res.data.country_code,
      country_name: res.data.country_name,
      region: res.data.region,
      city: res.data.city,
      asn_org: res.data.asn_org
      //isp:org:hostname:latitude:longitude:continent_code:continent_name:district:timezone_name:
      //connection_type:asn_number:asn:currency_code:currency_name:success:premium: 
    }

  }).catch( (err)=>{
    OutData.Errors.push({err:err, host:hostname, from:link})
    return "no IP"
  })

  axios.post( api, OutData).then( (res)=>{

    setToken(res.data.bzToken)
    setUser(res.data.user)
    res.data.Errors.map( (err)=> errors(err) )

    callback(res.data.serverData)

  }).catch( (err)=> errors(err) )


}
