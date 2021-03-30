import { bzPost, setUser, getUser, remUser, setToken, getToken, remToken } from './../functions'

export const news = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":     GET_STATE(action, state, setState);   break;
    case "ADD_NEWS":      ADD_NEWS(action, state, setState);    break;
    case "DELETE_NEWS":   DELETE_NEWS(action, state, setState);    break;
    default: break
  }
}

const GET_STATE = (action, state, setState)=>{
  
  bzPost("/news", {}, (data)=>{
    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.name === "News")
          ? {...item, content:data}
          : {...item, content:false}
        )
      },
      user: getUser()
    })
  })

}

const ADD_NEWS = (action, state, setState)=>{

  bzPost("/news", {add:true, data:action.payload}, (data)=>{
    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.name === "News")
          ? {...item, content:data}
          : {...item, content:false}
        )
      },
      user: getUser()
    })
  })
}

const DELETE_NEWS = (action, state, setState)=>{

  bzPost("/news", {delete:true, data:action.payload}, (data)=>{
    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.name === "News")
          ? {...item, content:data}
          : {...item, content:false}
        )
      },
      user: getUser()
    })
  })
}
