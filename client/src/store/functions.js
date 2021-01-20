import axios from 'axios'
import { api } from './variables'


export const bzPost = ( { method, link, object = {} }, callback )=>{
  
  const bzToken = localStorage.getItem("bzToken")

  if(method === "GET"){
    // CODE HERE
  }
  if(method === "POST"){
    let IP
    axios.get('http://ip-api.com/json').then( res => {
      IP = {
        ip: res.data.query,
        zip: res.data.zip,
        code: res.data.countryCode,
        country: res.data.country,
        region: res.data.regionName,
        city: res.data.city,
        name: res.data.as,
        // status: "success", isp: "", lat: "", lon: "", org: "", region: "", timezone: ""
      }
    })
    .then(function(){
      axios.post( api+link, {...object, bzToken, from: "cv.bzdrive.com"+link, IP} ).then( res => {
        localStorage.setItem("bzToken", res.data.bzToken)
        callback(res.data)
      })
    })
  }
}
