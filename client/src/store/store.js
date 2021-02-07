import { renderAll } from './renderAll'

import {
	TOGGLE_AUTH_PANNEL,
	TOGGLE_FORM,
	CHANGE_INPUT_VALUE,
	SEND_FORM
} from './actions'

import { bzPost } from './functions'


export let state = {
  auth: false,
  copyright: false,
  projects: false,
  user: false
}

export const setState = (data)=>{
  state = {...state, ...data}
  renderAll(state)
}

bzPost( {link:"/start"}, (data)=>{
  setState({
    auth: data.auth,
    copyright: data.copyright,
    projects: data.projects,
    user: JSON.parse( localStorage.getItem('user') )
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
