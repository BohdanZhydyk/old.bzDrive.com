import React from 'react'

import { translate } from './../../../../store/translate'


export const Button = ({ props:{ forms, lang, active, fn} })=>{

  let classes = active ? "btn btnActive" : "btn"

  let BTN_CLICK = (action)=>
    active
    ? fn({ app:"drive", type:"SEND_FORM", payload:action })
    : fn({ app:"drive", type:"TOGGLE_FORM", payload:action })

  return(
    <>
    {
      forms.map( (btn)=>
        btn.active === active &&
        <span className={classes} onClick={ ()=> BTN_CLICK(btn.action) } key={`FormBtn${btn.action}`} >
          {translate(lang, btn.action+"Btn")}
        </span>
      )
    }
    </>
  )

}
