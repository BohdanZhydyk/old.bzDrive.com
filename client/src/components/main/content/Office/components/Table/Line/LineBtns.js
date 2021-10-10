import React, { useState, useEffect } from 'react'


export const LineBtns = ({ props:{mode, line, nr, officeFn} })=>{

  const [all, setAll] = useState(false)

  const ADD_NEW = ()=> officeFn({ type:"ADD_NEW", payload:mode })

  const MORE = ()=> setAll( !all )
  const DELETE = ()=>{
    MORE()
    officeFn({ type:"DELETE", payload:line })
  }
  const EDIT = ()=>{
    MORE()
    officeFn({ type:"EDIT", payload:line })
  }
  const PRINT = ()=>{
    MORE()
    officeFn({ type:"PRINT", payload:line })
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
        ? <img className="imgBtn" src={icoPlus} alt="plusBtn" onClick={ ()=> ADD_NEW() } />
        :
        <div className="flex start">
          <img className={cl} src={icoDelete} alt="deleteBtn" onClick={ ()=> DELETE() } />
          <img className={cl} src={icoEdit} alt="editBtn" onClick={ ()=> EDIT() } />
          <img className={cl} src={icoPrint} alt="printBtn" onClick={ ()=> PRINT() } />
          <img className="imgBtn" src={icoMore} alt="moreBtn" onClick={ ()=> MORE() } />
        </div>
      }
    </div>
  )
}