import axios from 'axios'
import cookies from 'js-cookie'


export const setToken = (bzToken)=>{ cookies.set('bzToken', bzToken ) }
export const remToken = ()=>{ cookies.remove('bzToken') }
export const getToken = ()=>{ return cookies.get('bzToken') }

export const setUser = (user)=>{ JSON.stringify( cookies.set('user', user) ) }
export const remUser = ()=>{ cookies.remove('user') }
export const getUser = ()=>{ return cookies.get('user') }

export const errors = (err)=> console.log("ERRORS", err)


export const bzPost = async ( link, object, callback )=>{

  // let href = window.location.href
  let hostname = window.location.hostname

  let api

  hostname === 'localhost'
  ? api = 'http://localhost:5000'
  : api = 'https://bzdrive.com'

  let getIP = await axios.get('https://json.geoiplookup.io').then( (res)=> {

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
    errors({err:err, host:hostname, from:link})
    return "no IP"
  })

  let clientData = { link:link, bzToken:getToken(), user:getUser(), IP:getIP, object }

  axios.post( api, clientData).then( (res)=>{

    setToken(res.data.bzToken)
    setUser(res.data.user)

    callback({
      serverData:res.data.serverData,
      user:res.data.user
    })

  }).catch( (err)=> errors(err) )


}
