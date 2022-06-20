import React from 'react'


export const Input = ({ props:{input, profFn} })=>{

  let CHG_INPUT = (txt)=> profFn({ type:`Change-${input.name}`, payload:txt })

  return(
    <fieldset className="inputWrapper flex">

      <legend>
        {input.holder}
        {/* { input.error && <span className="txtOrg" >{` - ${ERR}`}</span> } */}
      </legend>

      <input
        type={input.type} placeholder={input.holder}
        value={input.val} onChange={ (e)=> CHG_INPUT( e.target.value ) }
      />

    </fieldset>
  )
}