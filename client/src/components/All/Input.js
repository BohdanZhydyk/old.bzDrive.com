import React from "react"

import { DigLen } from "../../state/functions"


export const Input =({ props:{input, print, Fn} })=>{

  let ON_CHANGE = (e)=>{
    let arr = e.target.value.split('-')
    let YYYYMMDD = {year:parseInt(arr[0]), month:parseInt(arr[1]), day:parseInt(arr[2])}
    let value = input.type === "date" ? YYYYMMDD : e.target.value
    Fn({type:`CHG_${input.form}`, value})
  }

  let ON_KEYUP_IMG = (e)=>{ Fn({type:`KEYUP_IMG_${input.form}`, value:e.target.value, key:e.key}) }

  let VAL = input.type === "date" ? input.val : false
  let YYYY = VAL?.year && DigLen(VAL.year, 4)
  let MM = VAL?.month && DigLen(VAL.month, 2)
  let DD = VAL?.day && DigLen(VAL.day, 2)

  let date = input.type === "date" ? {year:YYYY, month:MM, day:DD} : false

  let InputModeVal = `${date.year}-${date.month}-${date.day}`
  let TextModeVal = `${date.day}.${date.month}.${date.year}`

  let val = input.val
    ? input.type === "date" ? ( !print ? InputModeVal : TextModeVal ) : input.val
    : ""

  let img = `https://files.bzdrive.com/img/ico/ico${input.img}.png`
  
  return(
    <>
    {
      !print
      ?
      <fieldset className={`inputWrapper ${input.error && `inputWrapperError`} flex`}>

        <legend>{input.legend}</legend>

        <input
          type={ input.type }
          placeholder={ "wprowadź dane..." }
          value={ val }
          onChange={ (e)=> ON_CHANGE(e) }
          onKeyUp={ (e)=> e.key === "Enter" && ON_KEYUP_IMG(e) }
        />

        {
          ( input.img && input?.val?.length > 0 ) &&
          <img
            src={img}
            onClick={ ()=> ON_KEYUP_IMG({ target:{value:val}, key:"Enter" }) }
            alt="search"
          />
        }

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