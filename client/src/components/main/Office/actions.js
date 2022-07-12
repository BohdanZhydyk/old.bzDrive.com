import { bzPost } from "./../../../state/functions"


export const officeFn = (action, callback)=>{

  const type = action.type
  const mode = action.mode
  const query = action.query
  const payload = action.payload
  const ReloadFn = action.ReloadFn

  switch(type){
    case "GET_TABLE":     GET_TABLE(mode, query, callback);     break
    case "SAVE_DOC":      SAVE_DOC(mode, payload, ReloadFn);    break
    default: break
  }
}

const GET_TABLE = (mode, query, callback)=>{
  bzPost( "/getOffice", { getMode:mode, query }, (data)=>{ callback(data) })
}

const SAVE_DOC = (mode, payload, ReloadFn)=>{
  bzPost("/getOffice", { mode, save:payload }, (data)=>{ ReloadFn() })
}