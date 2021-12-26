import {
  bzPost,
  setUser,
  getUser,
  remUser,
  setToken,
  getToken,
  remToken,
  bzCalc,
  inputDateToStandart,
  unixToDateTimeConverter
} from './../../../../store/functions'

export const actions = (action, office, setOffice)=>{
  switch(action.type){
    case "GET_STATE":   GET_STATE(office, setOffice, action.payload);  break
    case "GET_MODE":    GET_MODE(office, setOffice, action.payload);   break
    case "SAVE":        SAVE(office, setOffice, action.payload);       break
    default: break;
  }
}

let GET_STATE = (office, setOffice, payload)=>{

  bzPost("/office", { getState:true }, (data)=>{ setOffice({btns:data.btns}) })

}

let GET_MODE = (office, setOffice, payload)=>{
  
  bzPost("/office", { getMode:payload }, (data)=>{

    setOffice({ ...office, table:[] })

    setOffice({ ...office, mode:payload, table:data })

  })

}

let SAVE = (office, setOffice, payload)=>{
  
  bzPost("/office", { save:payload, mode:office.mode }, (data)=>{
    GET_MODE(office, setOffice, office.mode)
  })

}