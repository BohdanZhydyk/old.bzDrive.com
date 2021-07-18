import React from 'react'


export const Buttons = ({ props:{officeFn} }) => {

  let CONFIRM_BTNS= (act)=> officeFn({ type:"CONFIRM_BTNS", payload:act })

  return(
    <div className="buttons flex">

      <button className="flex bold red" onClick={ ()=> CONFIRM_BTNS("cancel") }>Anulować</button>

      <button className="flex bold green" onClick={ ()=> CONFIRM_BTNS("confirm") }>Potwierdzić</button>
      
    </div>
  )
}