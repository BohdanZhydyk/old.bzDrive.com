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

export const actions = (action, statistic, setStatistic)=>{
  switch(action.type){
    case "GET_STATE": GET_STATE(action, statistic, setStatistic);	break;
    default: break
  }
}

let GET_STATE = (action, statistic, setStatistic)=>{

  bzPost("/statistic", {}, (data)=> setStatistic(data) )
  
}