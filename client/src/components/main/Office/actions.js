import {
  bzPost,
  unixToDateTimeConverter
} from "./../../../state/functions"

export const actions = (action, MM_YYYY, setMM_YYYY, office, setOffice)=>{
  switch(action.type){
    case "GET_STATE":     GET_STATE(setOffice, action.payload);                       break
    case "GET_MODE":      GET_MODE(setMM_YYYY, office, setOffice, action.payload);    break
    case "GET_TO_PAST":   GET_TO_PAST(office, setOffice, action.payload);             break
    case "SAVE":          SAVE(setMM_YYYY, office, setOffice, action.payload);                    break
    default: break
  }
}

let GET_STATE = (setOffice, payload)=>{

  bzPost("/getOffice", { getState:true }, (data)=>{ setOffice({btns:data.btns}) })

}

let GET_MODE = (setMM_YYYY, office, setOffice, payload)=>{

  let query = {}

  switch(payload){
    case "FS": 
      query = { "nr.month":unixToDateTimeConverter().month }
      break
    case "ZL":
      query = { $or: [ { status:"edited" }, { "nr.month":unixToDateTimeConverter().month } ] }
      break
    default: break
  }
  
  bzPost("/getOffice", { getMode:payload, query }, (data)=>{

    setMM_YYYY({
      MM: parseInt( unixToDateTimeConverter().month ),
      YYYY: parseInt( unixToDateTimeConverter().year )
    })

    setOffice({ ...office, table:[] })

    setOffice({ ...office, mode:payload, table:data })

  })

}

let GET_TO_PAST = (office, setOffice, payload)=>{
  
  let query = {}

  switch(office.mode){
    case "FS":  query = { ...payload };                 break
    case "ZL":  query = { status:"done", ...payload };  break
    default:    query = {};                             break
  }

  bzPost("/getOffice", { getToPast:office.mode, query }, (data)=>{

    setOffice({ ...office, table:[...office.table, ...data] })

  })

}

let SAVE = (setMM_YYYY, office, setOffice, payload)=>{
  
  bzPost("/getOffice", { save:payload, mode:office.mode }, (data)=>{

    GET_MODE(setMM_YYYY, office, setOffice, office.mode)
    
  })

}