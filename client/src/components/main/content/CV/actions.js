import { bzPost } from './../../../../store/functions'

export const actions = (action, cv, setCv)=>{
  switch(action.type){
    case "GET_STATE":       GET_STATE(action, cv, setCv);     break
    default: break
  }
}


let GET_STATE = (action, cv, setCv)=>{

  bzPost("/cv", {}, (data)=>{ setCv(data) })

}
