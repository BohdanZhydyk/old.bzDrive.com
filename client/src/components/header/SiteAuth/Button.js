import React from "react"

import { translate } from './../../../state/translate'


export const Button = ({ props:{btn, lang, authFn} })=>{
  
  let active = btn.active
  let form = btn.form
  let inputs = btn.inputs

  let on = false
  for(let i=0; i< inputs.length; i++) if(inputs[i].error) on = true

  let classes = `${active ? (on ? "btnDisActive" : "btnActive") : "btn"} flex`

  let CLICK = ()=> authFn({ type:(active ? (!on && "SEND_FORM") : "TOGGLE_FORM"), payload:form })

  return(
    <span className={classes} onClick={ ()=> CLICK() }>
      { translate(lang, `${form}Btn`) }
    </span>
  )

}