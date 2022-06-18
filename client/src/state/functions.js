import axios from 'axios'
import cookies from 'js-cookie'


export const bzRemToken = ()=> cookies.remove('bzToken')
export const bzRemUser = ()=> cookies.remove('bzUser')
export const bzRemCookie = ()=> cookies.remove('bzCookie')
export const bzGetToken = ()=> cookies.get('bzToken')
export const bzGetUser = ()=> cookies.get('bzUser') ? JSON.parse( cookies.get('bzUser') ) : false
export const bzGetCookie = ()=> cookies.get('bzCookie')
export const bzSetToken = (bzToken)=> cookies.set('bzToken', bzToken )
export const bzSetUser = (user)=> cookies.set( 'bzUser', JSON.stringify(user) )
export const bzSetCookie = ()=> cookies.set('bzCookie', true)

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
  let x = parseFloat(a)
  let y = parseFloat(b)
  switch(operation){
    case "+": return( (x + y).toFixed(2) )
    case "-": return( (x - y).toFixed(2) )
    case "*": return( (x * y).toFixed(2) )
    case "/": return( (x / y).toFixed(2) )
    default: break
  }
}

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

export const bzPriceToWord = (int)=>{

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

let digits = "0123456789"
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
export const vin_sanitise = (vin)=>{
  if(!vin) return
  let new_vin = ""
  for(let i=0; i<vin.length; i++){
    if( digits.includes(vin[i]) || letters.includes(vin[i]) ){
      new_vin += vin[i].toUpperCase()
    }
  }
  return new_vin.substring(0, 17)
}
export const numbers_sanitise = (numbers)=>{
  if(!numbers) return
  let new_numbers = ""
  for(let i=0; i<numbers.length; i++){
    if( digits.includes(numbers[i]) || letters.includes(numbers[i]) ){
      new_numbers += numbers[i].toUpperCase()
    }
  }
  return new_numbers.substring(0, 10)
}
export const zip_sanitize = (zip)=>{
  if(!zip) return
  let new_zip = ""
  for(let i=0; i<zip.length; i++){
    if( digits.includes(zip[i]) ){
      if( new_zip.length === 2 ) new_zip += "-"
      new_zip += zip[i]
    }
  }
  return new_zip.substring(0, 6)
}
export const tel_sanitize = (tel)=>{
  if(!tel) return
  let new_tel = ""
  for(let i=0; i<tel.length; i++){
    if( digits.includes(tel[i]) ){
      if( new_tel.length === 3 ) new_tel += " "
      if( new_tel.length === 7 ) new_tel += " "
      new_tel += tel[i]
    }
  }
  return new_tel.substring(0, 11)
}
export const acc_sanitize = (acc)=>{
  if(!acc) return
  let new_acc = ""
  for(let i=0; i<acc.length; i++){
    if( digits.includes(acc[i]) ){
      if( new_acc.length === 2 ) new_acc += " "
      if( new_acc.length === 7 ) new_acc += " "
      if( new_acc.length === 12 ) new_acc += " "
      if( new_acc.length === 17 ) new_acc += " "
      if( new_acc.length === 22 ) new_acc += " "
      if( new_acc.length === 27 ) new_acc += " "
      new_acc += acc[i]
    }
  }
  return new_acc.substring(0, 32)
}
export const nip_sanitize = (nip)=>{
  if(!nip) return
  let new_nip = ""
  for(let i=0; i<nip.length; i++){
    if( digits.includes(nip[i]) ){
      if( new_nip.length === 3 ) new_nip += "-"
      if( new_nip.length === 7 ) new_nip += "-"
      if( new_nip.length === 10 ) new_nip += "-"
      new_nip += nip[i]
    }
  }
  return new_nip.substring(0, 13)
}

export const FirstToCapital = (str)=>{
  let strArr = str.split(' ')
  let newStr = ""
  for(let i=0; i<strArr.length; i++){
    newStr += ` ${strArr[i].charAt(0).toUpperCase()}${strArr[i].slice(1).toLowerCase()}`
  }
  return newStr.trim()
}

export const errName = (val)=> val ? (val?.length > 3 ? false : true) : true
export const errZIP = (val)=> val ? (val?.length > 5 ? false : true) : true
export const errTown = (val)=> val ? (val?.length > 3 ? false : true) : true
export const errStreet = (val)=> val ? (val?.length > 3 ? false : true) : true
export const errTel = (val)=> val ? (val?.length > 10 ? false : true) : true
export const errNIP = (val)=> val ? (val?.length > 12 ? false : true) : true
export const errBrand = (val)=> val ? (val?.length > 1 ? false : true) : true
export const errModel = (val)=> val ? (val?.length > 1 ? false : true) : true
export const errFaults = (val)=> val ? (val?.length > 2 ? false : true) : true
export const errNumbers = (val)=> val ? (val?.length > 5 ? false : true) : true

export const bzPost = async (link, object, callback)=>{

  let hostname = window.location.hostname

  let api = (hostname === 'localhost')
    ? 'http://localhost:5000'
    : 'https://bzdrive.com'

  let ClientData = {
    Errors: [],
    bzToken: bzGetToken(),
    IP: false,
    user: bzGetUser(),
    object: object
  }

  ClientData.IP = await axios.get('https://json.geoiplookup.io').then( (res)=> {

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
    ClientData.Errors.push({err:err, host:hostname, from:link})
    return "no IP"
  })

  axios.post( api+link, ClientData).then( (res)=>{

    console.log('ServerData',res.data)

    let bzToken = res?.data?.bzToken
    let user = res?.data?.user
    let IP = res?.data?.IP
    let result = res?.data?.object?.result
    let errors = res?.data?.object?.errors

    let lang = IP?.country_code ? IP?.country_code.toLowerCase() : 'en'

    errors && errors.map( (err)=> console.log('err',err) )

    bzSetToken(bzToken)
    bzSetUser( {...user, lang: user.lang ? user.lang : lang} )

    callback(result)

  }).catch( (err)=> console.log('err',err) )
  
}