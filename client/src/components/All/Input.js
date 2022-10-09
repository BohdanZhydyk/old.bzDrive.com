import React from "react"

import { bzDateTo_DD_MM_YYYY, bzDateTo_YYYY_MM_DD } from "../../state/functions"


export const Input =({ props:{input, print, Fn} })=>{

  let ON_CHANGE = (e)=>{
    let dateVal = parseInt( e.target.value.split("-").join("") )
    let value = input.type === "date" ? dateVal : e.target.value
    Fn({type:`CHG_${input.form}`, value, input})
  }

  let ON_KEYUP_IMG = (e)=>{
    Fn({type:`KEYUP_IMG_${input.form}`, value:e.target.value, key:e.key, input})
  }

  let VAL = input.type === "date" ? ( input?.val ? input.val.toString() : false ) : false

  let InputModeVal = bzDateTo_YYYY_MM_DD(VAL)
  let TextModeVal = bzDateTo_DD_MM_YYYY(VAL)

  let val = input.val
    ? input.type === "date" ? ( !print ? InputModeVal : TextModeVal ) : input.val
    : ""

  let img = `https://bzdrive.com/files/ico/ico${input.img}.png`
  
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
            alt={input.img}
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