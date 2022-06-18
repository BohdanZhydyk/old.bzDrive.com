import { bzPost } from './../../../state/functions'

export const actions = (action, workshop, setWorkshop)=>{
  switch(action.type){
    case "GET_STATE": GET_STATE(setWorkshop);	break;
    default: break
  }
}

let GET_STATE = (setWorkshop)=>{

  bzPost("/getWorkshop", {}, (data)=> setWorkshop(data.workshop) )
  
}