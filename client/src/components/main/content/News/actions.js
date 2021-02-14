
export const EDIT_MODE = (action, state, setState)=>{
  setState(
    state.map( (item)=>
      (item._id === action.payload.id)
      ? {...item, editMode:action.payload.mode}
      : {...item}
    )
  )
}

export const CHANGE_INPUT = (action, state, setState)=>{
  if(action.payload.nr === "theme"){
    setState(
      state.map( (item)=>
        (item.id === action.payload._id)
        ? {
            ...item, top:{
              ...item.top, theme:action.payload.value
            }
          }
        : {...item}
      )
    )
  }
}