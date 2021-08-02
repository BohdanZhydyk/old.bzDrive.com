import React from 'react'


export const Input =({ props:{printMode, nr, input, officeFn} })=>{

  let CHANGE_INPUT = (e)=>
    officeFn({
      type:"CHANGE_INPUT",
      payload: { nr, input: {...input, val:e.target.value} }
    })

  return(
    <>
    {
      printMode
      ?
      <div className={`inputWrapper${printMode} flex start`}>

        <span className="left">{`${input.legend}:`}</span>

        <span className="right">{`${input.val}`}</span>
        
      </div>
      :
      <fieldset className={`inputWrapper ${input.val ? `` : input.important && `inputWrapperError`}`}>

        <legend >
          {input.legend}
          {/* <span className="inputErr txtOrg" >{error}</span> */}
        </legend>

        <input
          type={ input.type }
          placeholder={ input.val ? input.val : "wprowadź dane..." }
          value={ input.val ? input.val : "" }
          onChange={ (e)=> CHANGE_INPUT(e) }
        />

      </fieldset>
    }
    </>
  )
}