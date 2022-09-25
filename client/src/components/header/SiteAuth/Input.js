import React from "react"

import { nrErrToTxt, translate } from './../../../state/translate'


export const Input =({ props:{input, lang, authFn} })=>{

  let CHG_INPUT = (val)=> authFn({ type:"CHG_INPUT", payload:{...input, val} })

  let nr = input.error
  let ERR = nrErrToTxt(lang, nr)

  let name = translate( lang, `${input.name}Input` )

  return(
    <fieldset className="inputWrapper">

      <legend className="inputName">
        { name }
        { input.error && <span className="txtOrg" >{` - ${ERR}`}</span> }
      </legend>

      <input
        type={input.type} placeholder={name}
        value={input.val} onChange={ (e)=> CHG_INPUT( e.target.value.trim() ) }
      />

    </fieldset>
  )
}