import { bzPost } from "./../../../state/functions"

export const officeFn = (table, setTable, action)=>{
  switch(action.type){
    // case "GET_STATE":     GET_STATE(setOffice, action.payload);                       break
    case "GET_TABLE":     GET_TABLE(table, setTable, action);      break
    case "GET_TO_PAST":   GET_TO_PAST(table, setTable, action);    break
    // case "SAVE":          SAVE(setMM_YYYY, office, setOffice, action.payload);        break
    default: break
  }
}

// let GET_STATE = (setOffice, payload)=>{

//   bzPost("/getOffice", { getState:true }, (data)=>{ setOffice({btns:data.btns}) })

// }

const GET_TABLE = (table, setTable, action)=>{
  bzPost("/getOffice", { getMode:action.mode, query:action.query }, (data)=>
    setTable(data)
  )
}

let GET_TO_PAST = (table, setTable, action)=>{
  bzPost("/getOffice", { getToPast:action.mode, query:action.query }, (data)=>
    setTable([...table, ...data])
  )
}

let SAVE = (setMM_YYYY, office, setOffice, payload)=>{
  
  bzPost("/getOffice", { save:payload, mode:office.mode }, (data)=>{

    // GET_MODE(setMM_YYYY, office, setOffice, office.mode)
    
  })

}