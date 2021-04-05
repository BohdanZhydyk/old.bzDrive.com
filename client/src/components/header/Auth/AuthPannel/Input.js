import React from 'react'

import { translate, nrErrToTxt } from './../../../../store/translate'


export const Input =({ props:{form, input, lang, fn} })=>{

  let error = input.error && ` - ${nrErrToTxt(lang, input.error.nr, input.error.min, input.error.max)}`

  let CHANGE_INPUT = (e)=>
    fn({
      app:"drive",
      type:"CHANGE_INPUT",
      payload: {
        form: form.action,
        name: input.name,
        value: input.name === "email" ? e.target.value.toLowerCase().trim() : e.target.value.trim()
      }
    })

  return(
    <fieldset className="inputWrapper">

      <legend className="inputName">
        {translate(lang, input.name+"Input")}
        <span className="inputErr txtOrg" >{error}</span>
      </legend>

      <input
        type={ input.type }
        placeholder={ `${translate(lang, input.name+"Input")}...` }
        value={ input.val }
        onChange={ (e)=> CHANGE_INPUT(e) }
      />

    </fieldset>
  )
}