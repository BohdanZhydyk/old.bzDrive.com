import React, { useState } from "react"


export const Input =({ props:{input, edit, AreaFn, hint} })=>{

  const [ok, setOk] = useState(false)

  let CHANGE_INPUT = (e)=>{
    setOk(false)
    AreaFn({form:input.form, value:e.target.value})
  }

  if( input.legend === "NIP" && input?.val?.length === 13 && !ok ){
    setOk(true)
    AreaFn({form:"GetCEIDG", for:input.form, value:input.val})
  }

  let placeholder = "wprowadź dane..."
  let val = input.val
    ? input.type === "date" || input.type === "PayDate"
      ? edit
        ? `${input.val.year}-${input.val.month}-${input.val.day}`
        : `${input.val.day}.${input.val.month}.${input.val.year}`
      : input.val
    : ""

  return(
    <>
    {
      edit
      ?
      <fieldset className={`inputWrapper ${input.error && `inputWrapperError`} flex wrap`}>

        <legend >
          {input.legend}
        </legend>

        <input
          type={ input.type }
          placeholder={ placeholder }
          value={ val }
          onChange={ (e)=> CHANGE_INPUT(e) }
        />

      </fieldset>
      :
      <div className="textWrapper flex">

        <span className={`textLegend${input.style} flex`}>{`${input.legend}:`}</span>

        <span className={`textValue${input.style} flex bold`}>{ val }</span>

      </div>

    }
    </>
  )
}