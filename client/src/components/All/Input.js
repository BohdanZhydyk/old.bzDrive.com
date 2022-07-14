import React from "react"

import { TwoDig } from "../../state/functions"


export const Input =({ props:{input, print, Fn} })=>{

  let ON_CHANGE = (e)=>{
    let arr = e.target.value.split('-')
    let YYYYMMDD = {year:parseInt(arr[0]), month:parseInt(arr[1]), day:parseInt(arr[2])}
    let value = input.type === "date" ? YYYYMMDD : e.target.value
    Fn({type:`CHG_${input.form}`, value})
  }

  let ON_KEYUP = (e)=>{ Fn({type:`KEYUP_${input.form}`, value:e.target.value, key:e.key}) }

  let VAL = input.type === "date" ? input.val : false
  let YYYY = `${parseInt(VAL?.year)}`
  let MM = TwoDig(VAL?.month)
  let DD = TwoDig(VAL?.day)

  let date = input.type === "date" ? {year:YYYY, month:MM, day:DD} : false

  let InputModeVal = `${date.year}-${date.month}-${date.day}`
  let TextModeVal = `${date.day}.${date.month}.${date.year}`

  let val = input.val
    ? input.type === "date" ? ( !print ? InputModeVal : TextModeVal ) : input.val
    : ""

  return(
    <>
    {
      !print
      ?
      <fieldset className={`inputWrapper ${input.error && `inputWrapperError`} flex wrap`}>

        <legend>{input.legend}</legend>

        <input
          type={ input.type }
          placeholder={ "wprowadź dane..." }
          value={ val }
          onChange={ (e)=> ON_CHANGE(e) }
          onKeyUp={ (e)=> ON_KEYUP(e) }
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