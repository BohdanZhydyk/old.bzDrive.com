import React from 'react'


export const Buttons = ({ props:{line, officeFn} }) => {

  let DELETE_INVOICE= ()=> officeFn({ type:"DELETE_INVOICE", payload:line._id })
  let SAVE_INVOICE= ()=> officeFn({ type:"SAVE_INVOICE", payload:line })

  return(
    <div className="buttons flex">

      <button className="flex bold red" onClick={ ()=> DELETE_INVOICE() }>Anulować</button>

      <button className="flex bold green" onClick={ ()=> SAVE_INVOICE() }>Potwierdzić</button>
      
    </div>
  )
}