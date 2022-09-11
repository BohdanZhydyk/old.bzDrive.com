import { bzPost } from './../../../../state/functions'


export const GET_STATE = (action, setTraffic)=>{

  let query = {"date.unix":{ $gt:(Date.now() - action.int) }}

  bzPost("/getTraffic", { query }, (data)=> setTraffic(data) )
  
}

export const SELECT_INT = (action, setTraffic, intervals, setIntervals)=>{

  setTraffic(false)

  setIntervals(intervals.map( (int)=> int.to === action.to ? {...int, act:true} : {...int, act:false} ))

  let query = {"date.unix":{ $gt:(Date.now() - action.to) }}

  bzPost("/getTraffic", { query }, (data)=> setTraffic(data) )
  
}