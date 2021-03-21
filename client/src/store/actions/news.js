import { bzPost } from './../functions'

export const news = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":       GET_STATE(action, state, setState);     break
    case "EDIT_MODE":       EDIT_MODE(action, state, setState);     break;
    case "CHANGE_INPUT":    CHANGE_INPUT(action, state, setState);  break;
    default: break
  }
}

const GET_STATE = (action, state, setState)=>{
  
  bzPost("/news", {}, (data)=>{

    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>{
          if(item.name === "News"){ return {...item, content:data.object} }
          else{ return item }
        })
      },
      user: data.user
    })
    
  })

}

const EDIT_MODE = (action, state, setState)=>{

  setState({
    ...state, news:state.news.map( (item)=>{
      return(
        item._id === action.payload.id
        ? {...item, editMode:action.payload.mode}
        : {...item}
      )
    })
  })

}

const CHANGE_INPUT = (action, state, setState)=>{

  if(action.payload.nr === "theme"){
    setState({
      ...state, news:state.news.map( (item)=>{
        return(
          item.id === action.payload._id
          ?
          {
            ...item, top:{
              ...item.top, theme:action.payload.value
            }
          }
          :
          {...item}
        )
      })
    })
  }

}
