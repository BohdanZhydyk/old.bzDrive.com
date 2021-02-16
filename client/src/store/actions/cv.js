import { bzPost } from './../functions'

export const cv = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":       GET_STATE(action, state, setState);     break
    default: break
  }
}

const GET_STATE = (action, state, setState)=>{

  bzPost("/cv", {}, (data)=>{
    
    if(data.err){ console.log('err', data.err) }
    else{
      setState({
        ...state,
        cv: {
          header: data.res.header,
          main: data.res.main,
          footer: data.res.footer
        }
      })
    }

  })

}
