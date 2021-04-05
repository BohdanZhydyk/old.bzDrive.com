import { bzPost, setUser, getUser, remUser, setToken, getToken, remToken } from './../functions'

export const news = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":     GET_STATE(action, state, setState);     break;
    case "ADD_NEWS":      ADD_NEWS(action, state, setState);      break;
    case "SAVE_NEWS":     SAVE_NEWS(action, state, setState);     break;
    case "DELETE_NEWS":   DELETE_NEWS(action, state, setState);   break;
    default: break
  }
}

function dataToState(data, state, setState){
  setState({
    ...state,
    drive: {
      ...state.drive,
      nav: state.drive.nav.map( (item, index)=>
        (item.to === "/")
        ? {...item, content:data}
        : {...item, content:false}
      )
    },
    user: getUser()
  })
}

const GET_STATE = (action, state, setState)=>{
  bzPost("/news", {}, (data)=> dataToState(data, state, setState) )
}

const ADD_NEWS = (action, state, setState)=>{
  bzPost("/news", {add:true, data:action.payload}, (data)=> dataToState(data, state, setState) )
}

const SAVE_NEWS = (action, state, setState)=>{
  bzPost("/news", {save:true, data:action.payload}, (data)=> dataToState(data, state, setState) )
}

const DELETE_NEWS = (action, state, setState)=>{
  bzPost("/news", {delete:true, data:action.payload}, (data)=> dataToState(data, state, setState) )
}