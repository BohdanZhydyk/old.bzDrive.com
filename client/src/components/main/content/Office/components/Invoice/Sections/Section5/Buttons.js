import React from 'react'


export const Buttons = ({ props:{line, officeFn} }) => {

  let EXIT_EDIT_MODE= ()=> officeFn({ type:"EXIT_EDIT_MODE" })
  let SAVE_INVOICE= ()=> officeFn({ type:"SAVE_INVOICE", payload:line })

  return(
    <div className="buttons flex">

      <button className="flex bold red" onClick={ ()=> EXIT_EDIT_MODE() }>Anulować</button>

      <button className="flex bold green" onClick={ ()=> SAVE_INVOICE() }>Potwierdzić</button>
      
    </div>
  )
}