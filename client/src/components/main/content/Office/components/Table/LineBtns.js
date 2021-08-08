import React, { useState, useEffect } from 'react'


export const LineBtns = ({ props:{line, nr, officeFn} })=>{

  const [all, setAll] = useState(false)

  const MORE_INVOICE = ()=> setAll( !all )
  const ADD_INVOICE = ()=> officeFn({ type:"ADD_INVOICE" })
  const DELETE_INVOICE = ()=>{
    MORE_INVOICE()
    officeFn({ type:"DELETE_INVOICE", payload:line })
  }
  const EDIT_INVOICE = ()=>{
    MORE_INVOICE()
    officeFn({ type:"EDIT_INVOICE", payload:line })
  }
  const PRINT_INVOICE = ()=>{
    MORE_INVOICE()
    officeFn({ type:"PRINT_INVOICE", payload:line })
  }

  let icoPlus = "https://files.bzdrive.com/img/ico/icoPlus.png"
  let icoDelete = "https://files.bzdrive.com/img/ico/icoDelete.png"
  let icoEdit = "https://files.bzdrive.com/img/ico/icoEdit.png"
  let icoPrint = "https://files.bzdrive.com/img/ico/icoPrint.png"
  let icoMore = "https://files.bzdrive.com/img/ico/icoMore.png"

  let cl = `imgBtn ${!all && `none`}`

  return(
    <div className={`lineBtns ${all && `green`} flex start`} >
      {
        nr === "top"
        ? <img className="imgBtn" src={icoPlus} alt="plusBtn" onClick={ ()=> ADD_INVOICE() } />
        :
        <div className="flex start">
          <img className={cl} src={icoDelete} alt="deleteBtn" onClick={ ()=> DELETE_INVOICE() } />
          <img className={cl} src={icoEdit} alt="editBtn" onClick={ ()=> EDIT_INVOICE() } />
          <img className={cl} src={icoPrint} alt="printBtn" onClick={ ()=> PRINT_INVOICE() } />
          <img className="imgBtn" src={icoMore} alt="moreBtn" onClick={ ()=> MORE_INVOICE() } />
        </div>
      }
    </div>
  )
}