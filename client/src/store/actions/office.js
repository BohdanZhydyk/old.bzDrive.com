import { bzPost, setUser, getUser, remUser, setToken, getToken, remToken } from './../functions'

export const office = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":	      GET_STATE(action, state, setState); 	break;
    case "GET_MODE":	      GET_MODE(action, state, setState); 	  break;
    case "ADD_INVOICE":	    ADD_INVOICE(action, state, setState); 	  break;
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
    
  bzPost("/officeAct", { get:action.payload }, (data)=>{

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
              },
              invoice: false
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

const ADD_INVOICE = (action, state, setState)=>{

  bzPost("/officeAct", { getDealer:true, user: getUser().login }, (data)=>{

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
                tableMode: "FA",
              },
              invoice: {
                status: "new",
                dealer: data[0],
                buyer: false
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

// const ADD_NEWS = (action, state, setState)=>{
//   bzPost("/news", {add:true, data:action.payload}, (data)=> dataToState(data, state, setState) )
// }