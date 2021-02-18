import axios from 'axios'
import cookies from 'js-cookie'


export const setToken = (bzToken)=>{ cookies.set('bzToken', bzToken ) }
export const remToken = ()=>{ cookies.remove('bzToken') }
export const getToken = ()=>{ return cookies.get('bzToken') }

export const setUser = (user)=>{ JSON.stringify( cookies.set('user', user) ) }
export const remUser = ()=>{ cookies.remove('user') }
export const getUser = ()=>{ return cookies.get('user') }


export const bzPost = ( link, object, callback )=>{

  // let href = window.location.href
  let hostname = window.location.hostname
  
  let IP
  let api

  hostname === 'localhost'
  ? api = 'http://localhost:5000'
  : api = 'https://bzdrive.com'

  let getData = (callback)=>{

    axios.post( api,
      {
        link: link,
        bzToken: getToken(),
        user: getUser(),
        IP: IP,
        object
      }
    ).then( (res)=>{
      callback(res.data)
    })

  }
  
  axios.get('https://json.geoiplookup.io')
    .then( (res)=>{

      IP = {
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

      getData( (data)=>{
        if( data.err !== [] ){ data.err.map( (item)=> console.log('ERROR!', item) ) }
        // if( data.err !== [] ){ console.log('ERROR!', data.err) }
        callback({object:data.object, user:data.user})
        setToken(data.bzToken)
        setUser(data.user)
      })

    })
    .catch( (err)=>{

      IP = {err:err, host:hostname, from:link, ip:false}

      getData( (data)=>{
        callback({object:data.object, user:data.user})
        setToken(data.bzToken)
        setUser(data.user)
      })

    })

}
