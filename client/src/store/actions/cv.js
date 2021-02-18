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
      cv: {
        header: data.object.header,
        main: data.object.main,
        footer: data.object.footer
      },
      user: data.user
    })

  })

}
