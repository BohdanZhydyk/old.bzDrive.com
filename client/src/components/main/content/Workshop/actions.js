import {
  bzPost,
  setUser,
  getUser,
  remUser,
  setToken,
  getToken,
  remToken,
  bzCalc,
  unixToDateConverter,
  unixToYearMonthConverter
} from './../../../../store/functions'

export const actions = (action, workshop, setWorkshop)=>{
  switch(action.type){
    case "GET_STATE": GET_STATE(action, workshop, setWorkshop);	break;
    default: break
  }
}

let GET_STATE = (action, workshop, setWorkshop)=>{

  bzPost("/workshop", {}, (data)=> setWorkshop(data[0].workshop) )
  
}