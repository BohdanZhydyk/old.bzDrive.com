import { renderAll } from './renderAll'

import {
	TOGGLE_AUTH_PANNEL,
	TOGGLE_FORM,
	CHANGE_INPUT_VALUE,
	SEND_FORM
} from './actions'

import { bzPost } from './functions'


export let state = ""

export const setState = (data)=>{
  state = {...state, ...data}
  renderAll(state)
}

bzPost( {method:"POST", link:"/start"}, (data)=>{
  setState({
    auth: data.result.auth,
    copyright: data.result.copyright,
    projects: data.result.projects,
    USER: data.USER
  })
})


export const fn = (action)=>{
  switch(action.type){
    case "TOGGLE_AUTH_PANNEL": 	TOGGLE_AUTH_PANNEL(action); 	break
    case "TOGGLE_FORM": 				TOGGLE_FORM(action); 				  break
    case "CHANGE_INPUT_VALUE":  CHANGE_INPUT_VALUE(action); 	break
    case "SEND_FORM":           SEND_FORM(action);            break
    default: break
  }
}
