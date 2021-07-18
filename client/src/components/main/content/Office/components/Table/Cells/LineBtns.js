import React from 'react'


export const LineBtns = ({nr, officeFn})=>{

  const ADD_INVOICE = ()=> officeFn({type:"ADD_INVOICE", payload:nr})

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
          <img src={icoEdit} alt="editBtn" />
          <img src={icoPrint} alt="printBtn" />
          <img src={icoDelete} alt="deleteBtn" />
        </div>
      }
    </div>
  )
}