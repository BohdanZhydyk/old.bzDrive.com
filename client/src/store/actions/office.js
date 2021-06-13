import { bzPost, setUser, getUser, remUser, setToken, getToken, remToken } from './../functions'

export const office = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":	    GET_STATE(action, state, setState); 	break;
    case "GET_MODE":	    GET_MODE(action, state, setState); 	  break;
    default: break
  }
}

const GET_STATE = (action, state, setState)=>{
    
  bzPost("/office", {}, (data)=>{

    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.to === "/office")
          ? {...item, content:data}
          : {...item, content:false}
        )
      },
      user: getUser()
    })

  })

}

const GET_MODE = (action, state, setState)=>{
    
  bzPost("/officeAct", {action:action.payload}, (data)=>{

    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.to === "/office")
          ? {...item, content: {...item.content, mode:action.payload, table:data} }
          : {...item, content:false}
        )
      },
      user: getUser()
    })

  })

}