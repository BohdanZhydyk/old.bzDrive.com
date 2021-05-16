import { bzPost, setUser, getUser, remUser, setToken, getToken, remToken } from './../functions'

export const workshop = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE": GET_STATE(action, state, setState); break;
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
        ? {...item, content:data[0].workshop}
        : {...item, content:false}
      )
    },
    user: getUser()
  })
}

const GET_STATE = (action, state, setState)=>{
  bzPost("/workshop", {}, (data)=> dataToState(data, state, setState) )
}