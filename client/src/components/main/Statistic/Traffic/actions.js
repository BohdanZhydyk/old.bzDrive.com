import { bzPost } from './../../../../state/functions'

export const actions = (action, intervals, setIntervals, traffic, setTraffic)=>{
  switch(action.type){
    case "GET_STATE":     GET_STATE(action, setTraffic);                               break
    case "SELECT_INT":    SELECT_INT(action, setTraffic, intervals, setIntervals);     break
    default: break
  }
}

let GET_STATE = (action, setTraffic)=>{

  let query = {"date.unix":{ $gt:(Date.now() - action.int) }}

  bzPost("/getTraffic", { query }, (data)=> setTraffic(data) )
  
}

let SELECT_INT = (action, setTraffic, intervals, setIntervals)=>{

  setTraffic(false)

  setIntervals(intervals.map( (int)=> int.to === action.to ? {...int, act:true} : {...int, act:false} ))

  let query = {"date.unix":{ $gt:(Date.now() - action.to) }}

  bzPost("/getTraffic", { query }, (data)=> setTraffic(data) )
  
}