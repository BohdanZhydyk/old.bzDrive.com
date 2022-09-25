import React, { useState } from 'react'

import {
  CHG_INPUT,
  TOGGLE_FORM,
  SEND_FORM
} from './actions'
import { UserPannel } from './UserPannel'
import { FormPannel } from './FormPannel'


export const AuthPannel = ({ props:{user, appFn} })=>{

  let lang = user.lang

  let login = {name:"login", type:"text", val:"", error:false}
  let pass = {name:"pass", type:"password", val:"", error:false}
  let pass1 = {name:"pass1", type:"password", val:"", error:false}
  let pass2 = {name:"pass2", type:"password", val:"", error:false}
  let email = {name:"email", type:"text", val:"", error:false}

  const [auth, setAuth] = useState([
    { form:"login", inputs:[login, pass], active:true },
    { form:"signin", inputs:[login, email, pass1, pass2] },
    { form:"forgot", inputs:[email, pass1, pass2] }
  ])

	let activeForms = auth.filter( el => el.active )
	let elseForms = auth.filter( el => !el.active )

	let forms = [...activeForms, ...elseForms]
  let form = forms[0].form
	let inputs = forms[0].inputs

  const authFn = (act)=>{
    let type = act.type
    let payload = act.payload
    switch(type){
      case "CHG_INPUT":     CHG_INPUT(payload, form, auth, setAuth);              break
      case "TOGGLE_FORM":   TOGGLE_FORM(payload, auth, setAuth);                  break
      case "SEND_FORM":     SEND_FORM(form, activeForms, auth, setAuth, appFn);   break
      default: break
    }
  }

  // console.log('auth', auth)

	return(
		<>
    {
      user?.login
      ? <UserPannel props={{user, appFn}} />
      : <FormPannel props={{inputs, forms, lang, authFn}} />
    }
    </>
	)
}