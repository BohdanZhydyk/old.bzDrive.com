import { bzPost, setUser, getUser, remUser, setToken, getToken, remToken } from './../functions'

export const office = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":	    GET_STATE(action, state, setState); 	break;
    case "GET_MODE":	    GET_MODE(action, state, setState); 	  break;
    case "ADD_NEW":	    ADD_NEW(action, state, setState); 	  break;
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
          ?
          {...item,
            content: {
            ...item.content,
              btns:{
                ...item.content.btns,
                btnsMode:action.payload
              },
              table:{
                tableMode: false,
                lines:data
              }
            }
          }
          :
          {...item, content:false}
        )
      },
      user: getUser()
    })

  })

}

const ADD_NEW = (action, state, setState)=>{

    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.to === "/office")
          ?
          {...item,
            content: {
            ...item.content,
              table:{
                ...item.content.table,
                tableMode: action.payload
              }
            }
          }
          :
          {...item, content:false}
        )
      },
      user: getUser()
    })

}