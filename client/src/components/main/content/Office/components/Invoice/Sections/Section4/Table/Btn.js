import React from 'react'


export const Btn = ({ props:{top, src, artFn} }) => {

  let BTN_CLICK = (type)=> artFn({type})

  let type = top ? "PLUS" : "DELETE_LINE"

  return(
    <div className="flex">
      <img src={src} onClick={ ()=> BTN_CLICK(type) } alt={type} />
    </div>
  )
}