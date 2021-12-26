import React from "react"


export const Input =({ props:{input, edit, AreaFn} })=>{

  let CHANGE_INPUT = (e)=> AreaFn({form:input.form, value:e.target.value})

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
      <fieldset className={`inputWrapper ${input.error && `inputWrapperError`} flex`}>

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