import { renderAll } from './renderAll'

import {
	TOGGLE_MENU,
	TOGGLE_FORM,
	CHANGE_INPUT_VALUE,
	SEND_FORM,
  EXIT_MENU
} from './actions'

import { bzPost } from './functions'


export let state = {
  auth: false,
  copyright: false,
  projects: false,
  user: false,
  nav: false
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
    user: JSON.parse( localStorage.getItem('user') ),
    nav: [
      {to:"/", name:'documentation'},
      {to:"/contacts", name:'contacts'},
      {to:"/about", name:'about'}
    ]
  })
})


export const fn = (action)=>{
  switch(action.type){
    case "TOGGLE_MENU": 	TOGGLE_MENU(action); 	break
    case "TOGGLE_FORM": 				TOGGLE_FORM(action); 				  break
    case "CHANGE_INPUT_VALUE":  CHANGE_INPUT_VALUE(action); 	break
    case "SEND_FORM":           SEND_FORM(action);            break
    case "EXIT_MENU":           EXIT_MENU(action);            break
    default: break
  }
}
