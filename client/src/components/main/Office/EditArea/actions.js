import {
  bzPost,
  bzGetUser,
  bzCalc,
  bzUnixToDateTime,
  FirstToCapital,
  DigLen,
  SumArray
} from "./../../../../state/functions"
import axios from 'axios'


export const emptyArt = {
  article:"", price:"0.00", quantity:"1", VAT:"23", netto:"0.00", vat:"0.00", sum:"0.00"
}

export const YYYYMMDD = {
  year: bzUnixToDateTime().year,
  month: bzUnixToDateTime().month,
  day: bzUnixToDateTime().day,
}

export const EFFECT = (mode, setDealer, place, setPlace, nr, setNr)=>{
  bzPost("/getOffice", { new:bzGetUser().login }, (data)=>{
    setDealer(data[0])
    !place && setPlace( data[0].addr.town )
    !nr?.year && setNr({ letter:mode, ...YYYYMMDD, sign:nr?.sign })
  })
}

export const HEAD = {
  CHG_NR: (action, nr, setNr)=> setNr( {...nr, sign:action.sign} ),
  CHG_PLACE:      (action, setPlace)=> setPlace( action.value ),
  CHG_FROM_DATE:  (action, setDate, dateTo, setDateTo, pay, setPay)=>{
    let newFrom = ( DigLen(action.value.year, 4)+DigLen(action.value.month, 2)+DigLen(action.value.day, 2) )
    let To = ( DigLen(dateTo.year, 4)+DigLen(dateTo.month, 2)+DigLen(dateTo.day, 2) )
    if(To >= newFrom){ setDate(action.value) }else{ setDate(action.value); setDateTo(action.value) }
    setPay({...pay, date:action.value})
  },
  CHG_TO_DATE:    (action, date, setDate, setDateTo)=>{
    let newTo = ( DigLen(action.value.year, 4)+DigLen(action.value.month, 2)+DigLen(action.value.day, 2) )
    let Date = ( DigLen(date.year, 4)+DigLen(date.month, 2)+DigLen(date.day, 2) )
    if(newTo >= Date){ setDateTo(action.value) }else{ setDate(action.value); setDateTo(action.value) }
  },
  CHG_STATUS:     (action, setStatus)=> setStatus( action.value )
}

export const BUYER = {
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

export const CAR = {
  CHG_CAR_BRAND:  (action, car, setCar)=> setCar({ ...car, brand:action.value }),
  CHG_CAR_MODEL:  (action, car, setCar)=> setCar({ ...car, model:action.value }),
  CHG_CAR_NUM:    (action, car, setCar)=> setCar({ ...car, numbers:action.value.toUpperCase() }),
  CHG_CAR_VIN:    (action, car, setCar)=> setCar({ ...car, vin:action.value.toUpperCase() }),
  CHG_CAR_PROD:   (action, car, setCar)=> setCar({ ...car, prod:action.value }),
  CHG_CAR_ODO:    (action, car, setCar)=> setCar({ ...car, odo:action.value }),
  CHG_CAR_ENG:    (action, car, setCar)=> setCar({ ...car, engine:action.value }),
  CHG_CAR_FUEL:   (action, car, setCar)=> setCar({ ...car, fuel:action.value }),
  CHG_CAR_AGREE:  (action, car, setCar)=> setCar({ ...car, agree:action.value }),
  CHG_CAR_FAULTS: (action, car, setCar)=> setCar({ ...car, faults:action.value })
}

export const CLI = {
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

export const ART = {
  
  ART_LINE_PLUS:    (articles, setArticles)=> setArticles([ ...articles, emptyArt ]),

  ART_LINE_DELETE:  (action, articles, setArticles)=>{
    setArticles(articles.filter( (art, n)=> (n !== action.i - 1) && art ))
  },

  CHG_ARTICLES: (action, articles, setArticles)=>{

    let calc = (art)=>{
      let price = art.price
      let quantity = art.quantity
      let VAT = art.VAT
      let netto = bzCalc( '*', price, quantity )
      let sum = bzCalc( '*', netto, bzCalc('+', '1.00', VAT/100) )
      let vat = bzCalc( '-', sum, netto )
      return {...art, price, quantity, VAT, netto, vat, sum}
    }
    let calcFromSUM = (art)=>{
      let sum = art.sum
      let VAT = art.VAT
      let quantity = art.quantity
      let netto = bzCalc( '/', sum, bzCalc('+', '1.00', VAT/100) )
      let vat = bzCalc( '-', sum, netto )
      let price = bzCalc( '/', netto, quantity )
      return {...art, price, quantity, VAT, netto, vat, sum}
    }

    setArticles(
      articles.map( (art, n)=>{
        if( n === (action.i - 1) ){
          if( action.cl === "ART el" ){ return {...art, article:action.value} }
          if( action.cl === "PRC el" ){ return calc({...art, price:action.value}) }
          if( action.cl === "QUA el" ){ return calc({...art, quantity:action.value}) }
          if( action.cl === "VAT el" ){ return calc({...art, VAT:action.value}) }
          if( action.cl === "PRV el" ){ return {...art, vat:action.value} }
          if( action.cl === "SUM el" ){ return calcFromSUM({...art, sum:action.value}) }
        }
        else{ return art }
      })
    )

  }
}

export const FILE = {
  ADD_FILE: (id, action, setFiles)=>{
    bzPost("/getOffice", { addFile:true, id, file:action.file }, (data)=>{
      setFiles(data.files)
    })
  }
}

export const FOO = {
  CHG_COMMENTS: (action, setComments)=> setComments(action.value),
  CHG_METHOD:   (action, pay, setPay)=> setPay({ ...pay, method:action.value }),
  CHG_PAYDATE:  (action, date, pay, setPay)=>{
    let newPay = ( DigLen(action.value.year, 4)+DigLen(action.value.month, 2)+DigLen(action.value.day, 2) )
    let Date = ( DigLen(date.year, 4)+DigLen(date.month, 2)+DigLen(date.day, 2) )
    Date <= newPay && setPay({ ...pay, date:action.value })
  }
}

export const GET_CEIDG = (action, date, buyer, setBuyer, client, setClient)=>{
  
  if(action.value.length === 13 && action.key === "Enter"){

    let nip = action.value

    bzPost("/getOffice", { getClient:{"client.nip":nip} }, (data)=>{

      let SetInfoFromNIP = (obj)=>{
        switch(action.type){
          case "KEYUP_IMG_BUYER_NIP":    setBuyer({...buyer, ...obj});     break
          case "KEYUP_IMG_CLIENT_NIP":   setClient({...client, ...obj});   break
          default: break
        }
      }

      if( data[0] ){ SetInfoFromNIP(data[0].client); return }
      
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
              // account: res.accountNumbers[0] ? res.accountNumbers[0] : "",
              addr:{
                zip,
                town: FirstToCapital(town),
                street: newAddr[0] ? `ul. ${FirstToCapital(newAddr[0])}` : ""
              }
            }
          )

        }
        
      })

    })
  }

}

export const SAVE_DOC = ({mode, id, action, place, date, dateTo, nr, dealer, buyer, car, client, articles, comments, pay, ReloadFn, officeFn})=>{

  let net = SumArray(articles.map( el=> el.netto ))
  let vat = SumArray(articles.map( el=> el.vat ))
  let sum = SumArray(articles.map( el=> el.sum ))

  let save = {
    id, status:action.status, place, date, dateTo, nr, dealer, buyer,
    car, client, articles, comments, netto:net, priceVAT:vat, brutto:sum, pay
  }
  
  officeFn({type:`SAVE_DOC`, ReloadFn, mode, payload:save})

}