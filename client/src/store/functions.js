import axios from 'axios'


export const bzPost = async ( { link, object = {} }, callback )=>{

  const api = 'http://localhost:5000'
  // const api = 'https://bzdrive.com'
  
  let bzToken = localStorage.getItem('bzToken')
  let user = JSON.parse( localStorage.getItem('user') )
  let from = link

  let IP = await axios.get('https://json.geoiplookup.io')
  .then( (res)=>{
    return {
      ip: res.data.ip,
      postal_code: res.data.postal_code,
      country_code: res.data.country_code,
      country_name: res.data.country_name,
      region: res.data.region,
      city: res.data.city,
      asn_org: res.data.asn_org,
      //isp:org:hostname:latitude:longitude:continent_code:continent_name:district:timezone_name:
      //connection_type:asn_number:asn:currency_code:currency_name:success:premium: 
    }
  })
  .catch( (err)=>{
    console.log(err)
    return {
      ip: false,
      postal_code: false,
      country_code: false,
      country_name: false,
      region: false,
      city: false,
      asn_org: false,
      //isp:org:hostname:latitude:longitude:continent_code:continent_name:district:timezone_name:
      //connection_type:asn_number:asn:currency_code:currency_name:success:premium:
    }
  })

  await axios.post( api+'/chkToken', {bzToken, user} ).then( (res)=>{
    bzToken = res.data.bzToken
    user = res.data.user
  })

  let response = await axios.post( api+link, object ).then( (res)=>{
    if(res.data.user){ user = res.data.user }
    return(res.data)
  })

  await axios.post( api+'/statistic', {bzToken, user, from, IP} ).then( (res)=>{
    localStorage.setItem( 'bzToken', res.data.bzToken )
    localStorage.setItem( 'user', JSON.stringify(res.data.user) )
  })

  callback(response)
  
}
