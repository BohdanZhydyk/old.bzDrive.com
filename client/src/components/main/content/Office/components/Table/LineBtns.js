import React from 'react'


export const LineBtns = ({ props:{line, nr, officeFn} })=>{

  const ADD_INVOICE = ()=> officeFn({ type:"ADD_INVOICE" })
  const EDIT_INVOICE = ()=> officeFn({ type:"EDIT_INVOICE", payload:line })
  const PRINT_INVOICE = ()=> officeFn({ type:"PRINT_INVOICE", payload:line })
  const DELETE_INVOICE = ()=> officeFn({ type:"DELETE_INVOICE", payload:line })

  let icoPlus = "https://files.bzdrive.com/img/ico/icoPlus.png"
  let icoEdit = "https://files.bzdrive.com/img/ico/icoEdit.png"
  let icoPrint = "https://files.bzdrive.com/img/ico/icoPrint.png"
  let icoDelete = "https://files.bzdrive.com/img/ico/icoDelete.png"

  return(
    <div className={`lineBtns flex start`} >
      {
        nr === "top"
        ? <img src={icoPlus} alt="plusBtn" onClick={ ()=> ADD_INVOICE() } />
        :
        <div className="flex start">
          <img src={icoEdit} alt="editBtn" onClick={ ()=> EDIT_INVOICE() } />
          <img src={icoPrint} alt="printBtn" onClick={ ()=> PRINT_INVOICE() } />
          <img src={icoDelete} alt="deleteBtn" onClick={ ()=> DELETE_INVOICE() } />
        </div>
      }
    </div>
  )
}