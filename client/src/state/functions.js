import axios from 'axios'
import cookies from 'js-cookie'


const MSG = (name, msg)=> console.log(name, msg)

export const bzRemToken = ()=> cookies.remove('bzToken')
export const bzRemUser = ()=> cookies.remove('bzUser')
export const bzRemCookie = ()=> cookies.remove('bzCookie')
export const bzGetToken = ()=> cookies.get('bzToken')
export const bzGetUser = ()=> cookies.get('bzUser') ? JSON.parse( cookies.get('bzUser') ) : false
export const bzGetCookie = ()=> cookies.get('bzCookie')
export const bzSetToken = (bzToken)=> cookies.set('bzToken', bzToken )
export const bzSetUser = (user)=> cookies.set( 'bzUser', JSON.stringify(user) )
export const bzSetCookie = ()=> cookies.set('bzCookie', true)

export const bzUnixToDateTime = ( DATE = new Date(Date.now()) )=>{
  let dateTime = {
    year:     DATE.getFullYear(),
    month:    DATE.getMonth()+1,
    day:      DATE.getDate(),
    weekday:  DATE.getDay() !== 0 ? DATE.getDay() : 7,
    hour:     DATE.getHours(),
    min:      DATE.getMinutes(),
    sec:      DATE.getSeconds(),
    lastDay:  new Date( new Date().getFullYear(), new Date().getMonth()+1, 0 ).getDate()
  }
  return dateTime
}

export const DigLen = (dig, len)=>{
  let newDig = dig ? dig.toString() : "0"
  while(newDig.length < len){ newDig = `0${newDig}` }
  return newDig
}

export const DateToUnix = (date)=>{
  return Date.parse( `${DigLen(date.year,4)}-${DigLen(date.month,2)}-${DigLen(date.day,2)}` )
}

export const DateToYYYYMMDD = (date)=>{
  return `${DigLen(date.year, 4)}${DigLen(date.month, 2)}${DigLen(date.day, 2)}`
}

export const UnixToYYYYMMDD = (unix)=>{
  let YYYY = DigLen(new Date(unix).getFullYear(), 4)
  let MM = DigLen(new Date(unix).getMonth()+1, 2)
  let DD = DigLen(new Date(unix).getDate(), 2)
  return parseInt( YYYY + MM + DD )
}
export const UnixToYYYYMM = (unix)=>{
  let YYYY = DigLen(new Date(unix).getFullYear(), 4)
  let MM = DigLen(new Date(unix).getMonth()+1, 2)
  return parseInt( YYYY + MM )
}
export const UnixToYYYY = (unix)=>{
  let YYYY = DigLen(new Date(unix).getFullYear(), 4)
  return parseInt( YYYY )
}

export const  IsSameDay = (firstUnix, secondUnix)=>{
  return UnixToYYYYMMDD(firstUnix) === UnixToYYYYMMDD(secondUnix)
}
export const  IsSameMonth = (firstUnix, secondUnix)=>{
  return UnixToYYYYMM(firstUnix) === UnixToYYYYMM(secondUnix)
}
export const  IsSameYear = (firstUnix, secondUnix)=>{
  return UnixToYYYY(firstUnix) === UnixToYYYY(secondUnix)
}

export const bzBytesCalc = (Bytes)=>{
  if(Bytes > 1073741824) return `${(parseFloat(Bytes) / parseFloat(1073741824)).toFixed(1)} GB`
  if(Bytes > 1048576) return `${(parseFloat(Bytes) / parseFloat(1048576)).toFixed(1)} MB`
  if(Bytes > 1024) return `${(parseFloat(Bytes) / parseFloat(1024)).toFixed(1)} kB`
  else return `${Bytes} B`
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

export const SumArray = (arr, sum = "0.00")=>{
  for(let i=0; i<arr?.length; i++) sum = bzCalc( "+", sum, arr[i] )
  return sum
}

export const bzPriceToWord = (price)=>{

  if(!price) return ""

  let liczba = parseInt( price.split('.')[0] )
  let grosze = price.split('.')[1]

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

export const NormalizeNr = (nr, short)=>{
  let letter = nr?.letter ? nr.letter : "--"
  let year = nr?.year ? DigLen(nr.year, 4) : "----"
  let month = nr?.month ? DigLen(nr.month, 2) : "--"
  let sign = nr?.sign ? DigLen(nr.sign, 4) : "----"
  return `${letter}/${year}/${month}/${!short ? sign : ``}`
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

export const errName =    (val)=> val ? (val?.length > 3  ? false : true) : true
export const errZIP =     (val)=> val ? (val?.length > 5  ? false : true) : true
export const errTown =    (val)=> val ? (val?.length > 3  ? false : true) : true
export const errStreet =  (val)=> val ? (val?.length > 3  ? false : true) : true
export const errTel =     (val)=> val ? (val?.length > 10 ? false : true) : true
export const errNIP =     (val)=> val ? (val?.length > 12 ? false : true) : true
export const errVIN =     (val)=> val ? (val?.length > 16 ? false : true) : true
export const errBrand =   (val)=> val ? (val?.length > 1  ? false : true) : true
export const errModel =   (val)=> val ? (val?.length > 1  ? false : true) : true
export const errNumbers = (val)=> val ? (val?.length > 5  ? false : true) : true

export const bzUploadFile = (file, fileAddr, fileName, cb)=>{

  const formData = new FormData()

  formData.append('file', file)
  formData.append('fileName', fileName)
  formData.append('fileAddr', fileAddr)

  const config = { headers: {'content-type': 'multipart/form-data'} }

  let link = 'https://bzdrive.com/uploadFile'
  // let link = 'http://localhost:5000/uploadFile'
  
  axios.post( link, formData, config ).then( (res)=> cb(res) )

}

export const bzDeleteFile = (fileAddr, fileName, cb)=>{
  
  let query = { fileAddr, fileName }

  let link = 'https://bzdrive.com/deleteFile'
  // let link = 'http://localhost:5000/deleteFile'

  axios.post( link, query).then( (res)=> cb(res) )

}

export const bzPost = async (link, object, callback)=>{

  let hostname = window.location.hostname
  let api = (hostname === 'localhost') ? 'http://localhost:5000' : 'https://bzdrive.com'

  let ClientData = {
    Errors: [],
    bzToken: bzGetToken(),
    IP: false,
    user: bzGetUser(),
    object: object
  }

  let IP_API = 'https://json.geoiplookup.io'

  ClientData.IP = await axios.get( IP_API ).then( (res)=> {

    return {
      host:         hostname,
      from:         link,
      ip:           res.data.ip,
      postal_code:  res.data.postal_code,
      country_code: res.data.country_code,
      country_name: res.data.country_name,
      region:       res.data.region,
      city:         res.data.city,
      asn_org:      res.data.asn_org
      //isp:org:hostname:latitude:longitude:continent_code:continent_name:district:timezone_name:
      //connection_type:asn_number:asn:currency_code:currency_name:success:premium: 
    }

  }).catch( (err)=>{
    ClientData.Errors.push({err:err, host:hostname, from:link})
    MSG(`${hostname}${link}`, err)
    return "No IP..."
  })

  axios.post( api+link, ClientData ).then( (res)=>{

    let data = res.data

    MSG("ServerData", data)

    let errors = data?.object?.errors
    errors && errors.map( (err)=> MSG("err", err) )
    
    let countryCode = data?.IP?.country_code ? data?.IP.country_code.toLowerCase() : 'en'
    let lang = data?.user?.lang ? data?.user.lang : countryCode

    bzSetToken( data?.bzToken )
    bzSetUser( {...data?.user, lang} )

    callback(data?.object?.result)

  })
  .catch( (err)=> MSG("err", err) )
  
}

export const bzGet = (link, cb)=>{

  let hostname = window.location.hostname

  let api = (hostname === 'localhost')
    ? 'http://localhost:5000'
    : 'https://bzdrive.com'

  axios.get(api + link)
    .then( (res)=>{ cb(res.data.object.result) })
    .catch( (err)=> MSG("err", err) )
  
} 