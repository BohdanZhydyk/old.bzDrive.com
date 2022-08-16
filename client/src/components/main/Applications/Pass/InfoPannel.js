import React from "react"


export const InfoPannel = ({ props:{info, ElFn} })=>{

  let ON_CHANGE = (e)=> ElFn({type:`CHG_INFO`, value:e.target.value})

  return(
    <fieldset className={`textAreaWrapper`}>

      <legend>{`info`}</legend>

      <textarea placeholder="wprowadz dane..." onChange={ (e)=> ON_CHANGE(e) }>
        { info }
      </textarea>

    </fieldset>
  )

}