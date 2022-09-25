import { bzPost } from "./../../../state/functions"
import { Calendar } from "./ZL/CalendarLogic"


export const officeFn = (action, callback)=>{

  const type = action.type
  const mode = action.mode
  const query = action.query
  const calendar = action.calendar
  const setCalendar = action.setCalendar
  const payload = action.payload
  const ReloadFn = action.ReloadFn

  switch(type){
    case "GET_TABLE":     GET_TABLE(mode, query, callback);       break
    case "GET_DEALERS":   GET_DEALERS(callback);                  break
    case "MINUS_WEEK":    MINUS_WEEK(calendar, setCalendar);      break
    case "PLUS_WEEK":     PLUS_WEEK(calendar, setCalendar);       break
    case "SAVE_DOC":      SAVE_DOC(mode, payload, ReloadFn);      break
    case "SAVE_ALL":      SAVE_ALL(mode, payload, ReloadFn);      break
    default: break
  }
}

const GET_TABLE = (mode, query, callback)=>{
  bzPost( "/getOffice", { getMode:mode, query }, (data)=>{ callback(data) })
}

const GET_DEALERS = (callback)=>{
  bzPost( "/getOffice", { getDealers:true }, (data)=>{ callback(data) })
}

const MINUS_WEEK = (calendar, setCalendar)=>{
  setCalendar( Calendar(calendar.slice(0,-1), false) )
}

const PLUS_WEEK = (calendar, setCalendar)=>{
  setCalendar( Calendar(false, calendar.slice(1)) )
}

const SAVE_DOC = (mode, payload, ReloadFn)=>{
  bzPost("/getOffice", { mode, save:payload }, (data)=>{ ReloadFn() })
}

const SAVE_ALL = (mode, payload, ReloadFn)=>{
  payload.map( (el, i)=>{
    el.chk &&
    bzPost("/getOffice", { mode, save:{...el, id:el._id, status:"done"} }, (data)=>{})
  })
  ReloadFn()
}