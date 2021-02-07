import axios from 'axios'

//const api = 'https://api.bzdrive.com'
const api = 'http://localhost:5000'


export const bzPost = async ( { link, object = {} }, callback )=>{
  
  const bzToken = localStorage.getItem("bzToken")

  let IP = await axios.get('https://json.geoiplookup.io').then( (res)=>{
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
  callback(IP)
}
