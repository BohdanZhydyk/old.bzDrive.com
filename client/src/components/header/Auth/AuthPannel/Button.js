import React from 'react'

import { translate } from './../../../../store/translate'


export const Button = ({ props:{form, nr, lang, headerFn} })=>{

  let active = form.active
  let action = form.action

  let classes = active ? "btnActive flex" : "btn flex"

  let BTN_CLICK = (action)=> headerFn({type:(active ? "SEND_FORM" : "TOGGLE_FORM"), payload:action })

  return(
    <span className={classes} onClick={ ()=> BTN_CLICK(action) } key={`FormBtn${action}${nr}`} >
      { translate(lang, action+"Btn") }
    </span>
  )

}
