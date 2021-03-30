import { bzPost, getUser } from './../functions'

export const cv = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":       GET_STATE(action, state, setState);     break
    default: break
  }
}

const GET_STATE = (action, state, setState)=>{

  bzPost("/cv", {}, (data)=>{

    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.name === "CV")
          ? {...item, content:data}
          : {...item, content:false}
        )
      },
      user: getUser()
    })

  })

}
