import { bzPost } from './../functions'

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
        nav: state.drive.nav.map( (item, index)=>{
          if(item.name === "CV"){ return {...item, content:data.object} }
          else{ return item }
        })
      },
      user: data.user
    })

  })

}
