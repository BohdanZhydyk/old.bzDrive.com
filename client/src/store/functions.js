import axios from 'axios'
import cookies from 'js-cookie'


export const setToken = (bzToken)=>{ cookies.set('bzToken', bzToken ) }
export const remToken = ()=>{ cookies.remove('bzToken') }
export const getToken = ()=>{ return( cookies.get('bzToken') ) }

export const setUser = (user)=>{ JSON.stringify( cookies.set('user', user) ) }
export const remUser = ()=>{ cookies.remove('user') }
export const getUser = ()=>{
  const initialUser = {role:"guest", login: false, lang: false, sex: false, ava: false}
  if( cookies.get('user') )
    return JSON.parse( cookies.get('user') )
  else
    return initialUser
}


export const bzPost = async ( link, object, callback )=>{

  // let href = window.location.href
  let hostname = window.location.hostname
  
  let api
  hostname === 'localhost'
  ? api = 'http://localhost:5000'
  : api = 'https://bzdrive.com'


  let bzToken = getToken()
  let user = getUser()
  let from = link

  let IP = await axios.get('https://json.geoiplookup.io')
    .then( (res)=>{
      return {
        err: false,
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
    })
    .catch( (err)=>{
      return {err:err, host:hostname, from:link, ip:false}
    })

  await axios.post( api+'/chkToken', { bzToken:getToken(), user:getUser() } )
    .then( (res)=>{
      bzToken = res.data.bzToken
      user = res.data.user
    })

  let response = await axios.post( api+link, object )
    .then( (res)=>{
      if(res.data.user){ user = res.data.user }
      return(res.data)
    })

  await axios.post( api+'/statistic', {bzToken, user, IP} )
    .then( (res)=>{
      setToken(res.data.bzToken)
      setUser(res.data.user)
    })

  callback(response)
  
}
