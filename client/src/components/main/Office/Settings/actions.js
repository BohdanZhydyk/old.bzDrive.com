import {
  bzPost,
  bzGetUser,
  bzUnixToDateTime,
  SumArray,
  bzDeleteFile,
  nip_sanitize,
  zip_sanitize,
  tel_sanitize,
  acc_sanitize
} from "./../../../../state/functions"


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

export const GET_DEALER = (action, dealer, setDealer)=>{
  bzPost( "/getProfile", {getUsers:true, lim:1, query:action.query[0]}, (data)=>{
    setDealer(data[0].dealer)
  })
}

export const CHG_DEALER_NAME = (action, dealer, setDealer)=>{
  let short = action.value.split(' ')[0]
  setDealer({ ...dealer, name:action.value, shortName:short })
}
export const CHG_DEALER_SHORTNAME = (action, dealer, setDealer)=>{
  setDealer({ ...dealer, shortName:action.value })
}
export const CHG_DEALER_ZIP = (action, dealer, setDealer)=>{
  setDealer({ ...dealer, addr:{...dealer.addr, zip:zip_sanitize(action.value)} })
}
export const CHG_DEALER_TOWN = (action, dealer, setDealer)=>{
  setDealer({ ...dealer, addr:{...dealer.addr, town:action.value} })
}
export const CHG_DEALER_STR = (action, dealer, setDealer)=>{
  setDealer({ ...dealer, addr:{...dealer.addr, street:action.value} })
}
export const CHG_DEALER_WWW = (action, dealer, setDealer)=>{
  setDealer({ ...dealer, contacts:{...dealer.contacts, www:action.value} })
}
export const CHG_DEALER_MAIL = (action, dealer, setDealer)=>{
  setDealer({ ...dealer, contacts:{...dealer.contacts, email:action.value} })
}
export const CHG_DEALER_TEL = (action, dealer, setDealer)=>{
  setDealer({ ...dealer, contacts:{...dealer.contacts, tel:tel_sanitize(action.value)} })
}
export const CHG_DEALER_ACC = (action, dealer, setDealer)=>{
  setDealer({ ...dealer, account:acc_sanitize(action.value) })
}
export const CHG_DEALER_NIP = (action, dealer, setDealer)=>{
  setDealer({ ...dealer, nip:nip_sanitize(action.value) })
}

export const CHG_AVA = (action, dealer, setDealer, ReloadFn)=>{

  let query = action.query
  let fileAddr = action.fileAddr
  let oldFile = action.oldFile
  let newFile = action.newFile
  let cbData = action.cbData
  action.login = action.query[0]["dealer.shortName"]

  bzPost("/getProfile", {chgAva:true, query, newFile}, (data)=>{
    GET_DEALER(action, dealer, setDealer)
    ReloadFn()
    bzDeleteFile(fileAddr, oldFile, (data)=> console.log("deleteFile",data) )
  })

}

export const SAVE_DEALER = (dealer, setAct, ReloadFn)=>{

  bzPost("/getProfile", {saveUsers:true, login:bzGetUser().login, dealer}, (data)=>{
    setAct(false)
  })

}