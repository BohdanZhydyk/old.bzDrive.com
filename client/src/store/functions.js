import axios from 'axios'
import cookies from 'js-cookie'


export const unixToDateTimeConverter = ( unix = new Date(Date.now()) )=>{
  let year = unix.getFullYear()
  let month = (unix.getMonth()+1) < 10 ? "0"+(unix.getMonth()+1) : unix.getMonth()+1
  let day = unix.getDate() < 10 ? "0"+unix.getDate() : unix.getDate()
  let hour = unix.getHours() < 10 ? "0"+unix.getHours() : unix.getHours()
  let min = unix.getMinutes() < 10 ? "0"+unix.getMinutes() : unix.getMinutes()
  let sec = unix.getSeconds() < 10 ? "0"+unix.getSeconds() : unix.getSeconds()
  let dateTime = {
    year:   year.toString(),
    month:  month.toString(),
    day:    day.toString(),
    hour:   hour.toString(),
    min:    min.toString(),
    sec:    sec.toString()
  }
  return dateTime
}

export const inputDateToStandart = ( date )=>{
  let newDate = {
    year:   date[0]+date[1]+date[2]+date[3],
    month:  date[5]+date[6],
    day:    date[8]+date[9]
  }
  return newDate
}

export const bzCalc = (operation, a, b)=>{
  switch(operation){
    case "+": return( (parseFloat(a) + parseFloat(b)).toFixed(2) )
    case "-": return( (parseFloat(a) - parseFloat(b)).toFixed(2) )
    case "*": return( (parseFloat(a) * parseFloat(b).toFixed(2)).toFixed(2) )
    case "/": return( (parseFloat(a) / parseFloat(b)).toFixed(2) )
    case "VAT":
      let one = (parseFloat(a) * parseFloat(b)).toFixed(2)
      let two = (parseFloat(one) / parseFloat(100)).toFixed(2)
      return two
    default: break
  }
}

export const bzIntToWord = (int)=>{

  if(!int) return ""

  let liczba = parseInt( int.split('.')[0] )
  let grosze = int.split('.')[1]

  let jednosci = ["","jeden","dwa","trzy","cztery","pięć","sześć","siedem","osiem","dziewięć"]
  let nascie = ["","jedenaście","dwanaście","trzynaście","czternaście","piętnaście","szesnaście","siedemnaście","osiemnaście","dziewietnaście"]
  let dziesiatki = ["","dziesięć","dwadzieścia","trzydzieści","czterdzieści","pięćdziesiąt","sześćdziesiąt","siedemdziesiąt","osiemdziesiąt","dziewięćdziesiąt"]
  let setki = ["","sto","dwieście","trzysta","czterysta","pięćset","sześćset","siedemset","osiemset","dziewięćset"]
  let grupy = [
    ["" ,"" ,""],
    ["tysiąc" ,"tysiące" ,"tysięcy"],
    ["milion" ,"miliony" ,"milionów"],
    ["miliard","miliardy","miliardów"],
    ["bilion" ,"biliony" ,"bilionów"],
    ["biliard","biliardy","biliardów"],
    ["trylion","tryliony","trylionów"]
  ]
    
  let wynik = '', znak = ''

  if( liczba === 0 ){ wynik = "zero" }
  if( liczba < 0 ){ znak = "minus"; liczba = -liczba; }
          
  let g = 0
  while( liczba > 0 ){
    let s = Math.floor((liczba % 1000)/100)
    let n = 0
    let d = Math.floor((liczba % 100)/10)
    let j = Math.floor(liczba % 10)
          
    if( d === 1 && j>0 ){ n = j; d = 0; j = 0; }

    let k = 2
    if( j === 1 && s+d+n === 0 ){ k = 0 }
    if( j === 2 || j === 3 || j === 4 ){ k = 1 }
    if( s+d+n+j > 0 ){ wynik = `${setki[s]} ${dziesiatki[d]} ${nascie[n]} ${jednosci[j]} ${grupy[g][k]} ${wynik}` }

    g++
    liczba = Math.floor(liczba/1000)
  }

  return(`${znak} ${wynik} zł ${grosze}/100 gr` );
}

export const NormalizeNr = (mode, nr)=>{
  let sign = nr.sign
  while(sign.length !== 6){ sign = `0${sign}` }
  return `${mode === "FS" ? `${nr?.letter}/` : ``}${nr?.year}/${nr?.month}/${sign}`
}

export const errName = (val)=> val ? (val?.length > 3 ? false : true) : true
export const errZIP = (val)=> val ? (val?.length > 4 ? false : true) : true
export const errTown = (val)=> val ? (val?.length > 3 ? false : true) : true
export const errStreet = (val)=> val ? (val?.length > 3 ? false : true) : true
export const errTel = (val)=> val ? (val?.length > 9 ? false : true) : true
export const errNIP = (val)=> val ? (val?.length > 9 ? false : true) : true
export const errBrand = (val)=> val ? (val?.length > 3 ? false : true) : true
export const errModel = (val)=> val ? (val?.length > 2 ? false : true) : true
export const errFaults = (val)=> val ? (val?.length > 2 ? false : true) : true
export const errNumbers = (val)=> val ? (val?.length > 5 ? false : true) : true

export const SummaryAll = (art)=>{
  let net = "0.00"
  let vat = "0.00"
  let sum = "0.00"
  for(let i=0; i<art?.length; i++){
    net = bzCalc( "+", net, art[i].netto )
    vat = bzCalc( "+", vat, art[i].vat )
    sum = bzCalc( "+", sum, art[i].sum )
  }
  return { net, vat, sum }
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
  
  axios.post( api+link, OutData).then( (res)=>{

    setToken(res.data.bzToken)
    setUser(res.data.user)
    res.data.Errors.map( (err)=> errors(err) )

    callback(res.data.serverData)

  }).catch( (err)=> errors(err) )

}