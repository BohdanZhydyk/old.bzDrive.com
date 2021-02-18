import { bzPost } from './../functions'

export const statistic = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":       GET_STATE(action, state, setState);     break
    default: break
  }
}

const GET_STATE = (action, state, setState)=>{

  bzPost("/statistic", {}, (data)=>{
    
    if(data.err){ console.log('err', data.err) }
    else{
      setState({
        ...state,
        statistic: data
      })
    }

  })

}
