import {
  bzPost,
  bzCalc,
  bzUnixToYYYYMMDD,
  FirstToCapital,
  DigLen,
  getRandomColor
} from "./../../../../state/functions"
import { officeFn } from "../actions"
import axios from 'axios'


export const emptyArt = {ART:"", PRI:"0.00", QUA:"1", VAT:"23", NET:"0.00", PRV:"0.00", SUM:"0.00"}

export const Logic = (
  action, id, mode, cookies, user, setNoPrint, status, setStatus, nr, setNr,
  buyer, setBuyer, car, setCar, client, setClient, articles, setArticles,
  files, setFiles, comments, setComments, dealer, setDealer, ReloadFn
)=>{
    
  setNoPrint(true)
  
  switch(action.type){

    case "EFFECT":          EFFECT(mode, user, setDealer, nr, setNr);             break

    case "CHG_STATUS":      HEAD.CHG_STATUS(action, setStatus);                   break
    case "CHG_NR":          HEAD.CHG_NR(action, nr, setNr);                       break
    case "CHG_PLACE":       HEAD.CHG_PLACE(action, nr, setNr);                    break
    case "CHG_FROM_DATE":   HEAD.CHG_FROM_DATE(action, nr, setNr);                break
    case "CHG_TO_DATE":     HEAD.CHG_TO_DATE(action, nr, setNr);                  break
    case "CHG_METHOD":      HEAD.CHG_METHOD(action, nr, setNr);                   break

    case "CHG_BUYER_NAME":  BUYER.CHG_BUYER_NAME(action, buyer, setBuyer);        break
    case "CHG_BUYER_ZIP":   BUYER.CHG_BUYER_ZIP(action, buyer, setBuyer);         break
    case "CHG_BUYER_TOWN":  BUYER.CHG_BUYER_TOWN(action, buyer, setBuyer);        break
    case "CHG_BUYER_STR":   BUYER.CHG_BUYER_STR(action, buyer, setBuyer);         break
    case "CHG_BUYER_WWW":   BUYER.CHG_BUYER_WWW(action, buyer, setBuyer);         break
    case "CHG_BUYER_MAIL":  BUYER.CHG_BUYER_MAIL(action, buyer, setBuyer);        break
    case "CHG_BUYER_TEL":   BUYER.CHG_BUYER_TEL(action, buyer, setBuyer);         break
    case "CHG_BUYER_ACC":   BUYER.CHG_BUYER_ACC(action, buyer, setBuyer);         break
    case "CHG_BUYER_NIP":   BUYER.CHG_BUYER_NIP(action, buyer, setBuyer);         break

    case "CHG_CAR_BRAND":   CAR.CHG_CAR_BRAND(action, car, setCar);               break
    case "CHG_CAR_MODEL":   CAR.CHG_CAR_MODEL(action, car, setCar);               break
    case "CHG_CAR_NUM":     CAR.CHG_CAR_NUM(action, car, setCar);                 break
    case "CHG_CAR_VIN":     CAR.CHG_CAR_VIN(action, car, setCar);                 break
    case "CHG_CAR_PROD":    CAR.CHG_CAR_PROD(action, car, setCar);                break
    case "CHG_CAR_ODO":     CAR.CHG_CAR_ODO(action, car, setCar);                 break
    case "CHG_CAR_ENG":     CAR.CHG_CAR_ENG(action, car, setCar);                 break
    case "CHG_CAR_FUEL":    CAR.CHG_CAR_FUEL(action, car, setCar);                break
    case "CHG_CAR_AGREE":   CAR.CHG_CAR_AGREE(action, car, setCar);               break
    case "CHG_CAR_FAULTS":  CAR.CHG_CAR_FAULTS(action, car, setCar);              break
    case "CHG_COLOR":       CAR.CHG_COLOR(action, car, setCar);                   break
    
    case "CHG_CLIENT_NAME": CLI.CHG_CLIENT_NAME(action, client, setClient);       break
    case "CHG_CLIENT_ZIP":  CLI.CHG_CLIENT_ZIP(action, client, setClient);        break
    case "CHG_CLIENT_TOWN": CLI.CHG_CLIENT_TOWN(action, client, setClient);       break
    case "CHG_CLIENT_STR":  CLI.CHG_CLIENT_STR(action, client, setClient);        break
    case "CHG_CLIENT_WWW":  CLI.CHG_CLIENT_WWW(action, client, setClient);        break
    case "CHG_CLIENT_MAIL": CLI.CHG_CLIENT_MAIL(action, client, setClient);       break
    case "CHG_CLIENT_TEL":  CLI.CHG_CLIENT_TEL(action, client, setClient);        break
    case "CHG_CLIENT_ACC":  CLI.CHG_CLIENT_ACC(action, client, setClient);        break
    case "CHG_CLIENT_NIP":  CLI.CHG_CLIENT_NIP(action, client, setClient);        break
    
    case "ART_LINE_PLUS":   ART.ART_LINE_PLUS(articles, setArticles);             break
    case "ART_LINE_DELETE": ART.ART_LINE_DELETE(action, articles, setArticles);   break
    case "CHG_ARTICLES":    ART.CHG_ARTICLES(action, articles, setArticles);      break

    case "ADD_FILE":        FILE.ADD_FILE(id, action, setFiles);                  break
    
    case "CHG_COMMENTS":    FOO.CHG_COMMENTS(action, setComments);                break

    case "KEYUP_IMG_BUYER_NIP": GET_CEIDG(action, setBuyer, setClient);           break
    case "KEYUP_IMG_CAR_VIN":   GET_VIN(action, car, setCar);                     break

    case "PRINT_DOC":
      cookies.set( 'Document', JSON.stringify({mode, id}) )
      window.open(`/document`, "_blank")
      break

    case "SAVE_DOC":
      SAVE_DOC({
        action, mode, id, status, user, nr, dealer, buyer, car,
        client, articles, files, comments, ReloadFn, officeFn
      })
      break
    
    default: break

  }
}

const EFFECT = (mode, user, setDealer, nr, setNr)=>{
  bzPost("/getOffice", { new:user }, (data)=>{
    setDealer(data[0])
    !nr && setNr({
      mode, sign:"----", from:bzUnixToYYYYMMDD(), to:bzUnixToYYYYMMDD(),
      place:data[0].addr.town, method:1
    })
  })
}

const HEAD = {
  CHG_STATUS: (action, setStatus)=> setStatus(action.value),
  CHG_NR: (action, nr, setNr)=> setNr({...nr, sign:action.sign}),
  CHG_PLACE: (action, nr, setNr)=> setNr({...nr, place:action.value}),
  CHG_FROM_DATE: (action, nr, setNr)=>{
    (nr.to >= action.value)
    ? setNr({...nr, from:action.value})
    : setNr({...nr, from:action.value, to:action.value})
  },
  CHG_TO_DATE: (action, nr, setNr)=>{
    (action.value >= nr.from)
    ? setNr({...nr, to:action.value})
    : setNr({...nr, from:action.value, to:action.value})
  },
  CHG_METHOD: (action, nr, setNr)=> setNr({...nr, method:action.value})
}

const BUYER = {
  CHG_BUYER_NAME: (action, buyer, setBuyer)=> setBuyer({ ...buyer, name:action.value }),
  CHG_BUYER_ZIP:  (action, buyer, setBuyer)=> setBuyer({ ...buyer, addr:{...buyer.addr, zip:action.value} }),
  CHG_BUYER_TOWN: (action, buyer, setBuyer)=> setBuyer({ ...buyer, addr:{...buyer.addr, town:action.value} }),
  CHG_BUYER_STR:  (action, buyer, setBuyer)=> setBuyer({ ...buyer, addr:{...buyer.addr, street:action.value} }),
  CHG_BUYER_WWW:  (action, buyer, setBuyer)=> setBuyer({ ...buyer, contacts:{...buyer.contacts, www:action.value} }),
  CHG_BUYER_MAIL: (action, buyer, setBuyer)=> setBuyer({ ...buyer, contacts:{...buyer.contacts, email:action.value} }),
  CHG_BUYER_TEL:  (action, buyer, setBuyer)=> setBuyer({ ...buyer, contacts:{...buyer.contacts, tel:action.value} }),
  CHG_BUYER_ACC:  (action, buyer, setBuyer)=> setBuyer({ ...buyer, account:action.value }),
  CHG_BUYER_NIP:  (action, buyer, setBuyer)=> setBuyer({ ...buyer, nip:action.value })
}

const CAR = {
  CHG_CAR_BRAND:  (action, car, setCar)=> setCar({ ...car, brand:action.value }),
  CHG_CAR_MODEL:  (action, car, setCar)=> setCar({ ...car, model:action.value }),
  CHG_CAR_NUM:    (action, car, setCar)=> setCar({ ...car, numbers:action.value.toUpperCase() }),
  CHG_CAR_VIN:    (action, car, setCar)=> setCar({ ...car, vin:action.value.toUpperCase() }),
  CHG_CAR_PROD:   (action, car, setCar)=> setCar({ ...car, prod:action.value }),
  CHG_CAR_ODO:    (action, car, setCar)=> setCar({ ...car, odo:action.value }),
  CHG_CAR_ENG:    (action, car, setCar)=> setCar({ ...car, engine:action.value }),
  CHG_CAR_FUEL:   (action, car, setCar)=> setCar({ ...car, fuel:action.value }),
  CHG_CAR_AGREE:  (action, car, setCar)=> setCar({ ...car, agree:action.value }),
  CHG_CAR_FAULTS: (action, car, setCar)=> setCar({ ...car, faults:action.value }),
  CHG_COLOR:      (action, car, setCar)=> setCar({ ...car, color:getRandomColor() })
}

const CLI = {
  CHG_CLIENT_NAME:  (action, client, setClient)=> setClient({ ...client, name:action.value }),
  CHG_CLIENT_ZIP:   (action, client, setClient)=> setClient({ ...client, addr:{...client.addr, zip:action.value} }),
  CHG_CLIENT_TOWN:  (action, client, setClient)=> setClient({ ...client, addr:{...client.addr, town:action.value} }),
  CHG_CLIENT_STR:   (action, client, setClient)=> setClient({ ...client, addr:{...client.addr, street:action.value} }),
  CHG_CLIENT_WWW:   (action, client, setClient)=> setClient({ ...client, contacts:{...client.contacts, www:action.value} }),
  CHG_CLIENT_MAIL:  (action, client, setClient)=> setClient({ ...client, contacts:{...client.contacts, email:action.value} }),
  CHG_CLIENT_TEL:   (action, client, setClient)=> setClient({ ...client, contacts:{...client.contacts, tel:action.value} }),
  CHG_CLIENT_ACC:   (action, client, setClient)=> setClient({ ...client, account:action.value }),
  CHG_CLIENT_NIP:   (action, client, setClient)=> setClient({ ...client, nip:action.value })
}

const ART = {
  
  ART_LINE_PLUS:    (articles, setArticles)=> setArticles([ ...articles, emptyArt ]),

  ART_LINE_DELETE:  (action, articles, setArticles)=>{
    setArticles(articles.filter( (art, n)=> (n !== action.i) && art ))
  },

  CHG_ARTICLES: (action, articles, setArticles)=>{

    let calc = (art)=>{
      let PRI = art.PRI
      let QUA = art.QUA
      let VAT = art.VAT
      let NET = bzCalc( '*', PRI, QUA )
      let SUM = bzCalc( '*', NET, `1.${VAT}` )
      let PRV = bzCalc( '-', SUM, NET )
      return {...art, PRI, QUA, VAT, NET, PRV, SUM}
    }
    let calcFromSUM = (art)=>{
      let SUM = art.SUM
      let VAT = art.VAT
      let QUA = art.QUA
      let NET = bzCalc( '/', SUM, `1.${VAT}` )
      let PRV = bzCalc( '-', SUM, NET )
      let PRI = bzCalc( '/', NET, QUA )
      return {...art, PRI, QUA, VAT, NET, PRV, SUM}
    }

    setArticles(
      articles.map( (art, n)=>{
        if( n === (action.i) ){
          if( action.cl === "ART" ){ return {...art, ART:action.value} }
          if( action.cl === "PRI" ){ return calc({...art, PRI:action.value}) }
          if( action.cl === "QUA" ){ return calc({...art, QUA:action.value}) }
          if( action.cl === "VAT" ){ return calc({...art, VAT:action.value}) }
          if( action.cl === "PRV" ){ return {...art, PRV:action.value} }
          if( action.cl === "SUM" ){ return calcFromSUM({...art, SUM:action.value}) }
        }
        else{ return art }
      })
    )

  }
}

const FILE = {
  ADD_FILE: (id, action, setFiles)=>{
    bzPost("/getOffice", { addFile:true, id, file:action.file }, (data)=>{
      setFiles(data.files)
    })
  }
}

const FOO = {
  CHG_COMMENTS: (action, setComments)=> setComments(action.value)
}

const GET_CEIDG = (action, setBuyer, setClient)=>{
  
  if(action.value.length === 13 && action.key === "Enter"){

    let nip = action.value

    bzPost("/getOffice", { getClient:{"buyer.nip":nip} }, (data)=>{

      let SetInfoFromNIP = (obj)=>{
        switch(action.type){
          case "KEYUP_IMG_BUYER_NIP":    setBuyer(obj);     break
          case "KEYUP_IMG_CLIENT_NIP":   setClient(obj);   break
          default: break
        }
      }

      if( data ){ SetInfoFromNIP(data); return }
      
      let NIP = nip.split("-").join("")
      let YYYY = DigLen(new Date( Date.now() ).getFullYear(), 4)
      let MM =   DigLen(new Date( Date.now() ).getMonth()+1, 2)
      let DD =   DigLen(new Date( Date.now() ).getDate(), 2)

      let link = `https://wl-api.mf.gov.pl/api/search/nip/${NIP}?date=${YYYY}-${MM}-${DD}`
      
      axios.get( link ).then( (res)=>{

        if(res.status === 200){
          
          res = res.data.result.subject
          
          let newAddr = (res.residenceAddress ? res.residenceAddress : res.workingAddress).split(', ')
          let zip = ""
          let town = ""

          if( newAddr !== "" ){
            for(let i=0; i<newAddr[1].length; i++){
              if(i < 6) zip += newAddr[1][i]
              if(i > 6) town += newAddr[1][i]
            }
          }
          
          SetInfoFromNIP (
            {
              name: res.name ? FirstToCapital( res.name ) : "",
              nip: nip,
              addr:{
                zip,
                town: FirstToCapital(town),
                street: newAddr[0] ? `ul. ${FirstToCapital(newAddr[0])}` : ""
              }
              // account: res.accountNumbers[0] ? res.accountNumbers[0] : "",
            }
          )

        }
        
      })

    })
  }

}

const GET_VIN = (action, car, setCar)=>{
  
  if(action.value.length === 17 && action.key === "Enter"){
    
    let vin = action.value

    bzPost("/getOffice", { getCar:{"car.vin":vin} }, (data)=>{

      if( data ){ setCar({...car, data}) }
      
      // ZrQEPSkKYnp1YTgzQGdtYWlsLmNvbQ==
      // FREE = 5,000 API calls/mo
      let link = `https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKYnp1YTgzQGdtYWlsLmNvbQ==`
      // let link = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json` //Nhtsa
        
      axios.get( link ).then( (res)=>{
  
        if(res.status === 200){
          
          res = res.data

          let size = `${res.engine.size}L_${res.engine.configuration}${res.engine.cylinder}`// zrobic po przecinku
          let drive = ()=>{
            switch(res?.drivenWheels){
              case "four wheel drive": return "4WD"
              case "all wheel drive": return "AWD"
              default: return res.drivenWheels
            }
          }
          let code = `${res.engine.manufacturerEngineCode}`
          let hp = `${parseInt(bzCalc("*", res.engine.horsepower, 0.74))}kW`
  
          let engine = `${size}_${code}_${hp}_${drive()}`
  
          setCar(
            {
              ...car,
              brand:res?.make?.name ? res.make.name : (data?.brand ? data.brand : ""),
              model:res?.model?.name ? res.model.name : (data?.model ? data.model : ""),
              prod:res?.years[0]?.year ? res.years[0].year : (data?.prod ? data.prod : ""),
              engine: data?.engine ? data.engine : engine
            }
          )
  
        }
      })
      
    })

  }

}

const SAVE_DOC = ({
  action, mode, id, user, nr, dealer, buyer, car, client,
  articles, files, comments, ReloadFn, officeFn
})=>{

  console.log(articles)

  let save = {
    id, user, nr, dealer, buyer, client, car, files, comments,
    status:action.status,
    articles: articles.map( el=>{
      return {ART:el.ART, PRI:el.PRI, QUA:el.QUA, VAT:el.VAT, NET:el.NET, PRV:el.PRV, SUM:el.SUM}
    })
  }
  
  officeFn({type:`SAVE_DOC`, ReloadFn, mode, payload:save})

}