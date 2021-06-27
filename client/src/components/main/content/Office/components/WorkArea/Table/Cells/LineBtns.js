import React from 'react'


export const LineBtns = ({nr, officeFn})=>{

  const ADD_INVOICE = ()=> officeFn({type:"ADD_INVOICE"})

  let icoPlus = "https://files.bzdrive.com/img/ico/icoPlus.png"
  let icoEdit = "https://files.bzdrive.com/img/ico/icoEdit.png"
  let icoDelete = "https://files.bzdrive.com/img/ico/icoDelete.png"

  return(
    <div className={`lineBtns flex start`} onClick={ ()=> ADD_INVOICE() }>
      {
        nr === "top"
        ? <img className="imgBtn" src={icoPlus} alt="plusBtn" />
        :
        <div className="flex start">
          <img className="imgBtn" src={icoEdit} alt="editBtn" />
          <img className="imgBtn" src={icoDelete} alt="deleteBtn" />
        </div>
      }
    </div>
  )
}