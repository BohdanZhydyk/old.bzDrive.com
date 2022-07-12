import React from 'react'

import "./ModeBtns.scss"


const ModeBtns = ({ props:{btns, mode, officeFn} })=>{

  return (
    <div className="ModeBtns flex wrap">
    {
      btns.map( btn =>
        <Btn props={{btn, mode, officeFn}} key={`ModeBtn${btn.id}`} />
      )
    }
    </div>
  )
}

const Btn = ({ props:{btn, mode, officeFn} })=>{

  let GET_MODE = ()=> officeFn({type:"GET_MODE", payload:btn.id})

  let cl = `${!mode ? `Btn` : `BtnSmall`} ${mode === btn.id ? `BtnAct` : ``} flex`

  return (
    <div className={cl} onClick={ ()=> GET_MODE() }>
      <span>{btn.txt}</span>
    </div>
  )
}

export default ModeBtns