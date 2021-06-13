import React from 'react'


export const ModeBtns = ({ props:{mode, btns, officeFn} })=>{
  return(
    <div className="flex wrap">
    {
      btns.map( btn=> <ModeBtn mode={mode} btn={btn} officeFn={officeFn} /> )
    }
    </div>
  )
}

const ModeBtn = ({mode, btn, officeFn})=>{

  let GET_MODE = ()=> officeFn({type:"GET_MODE", payload:btn.id})

  let classes = `funcBtn ${ !mode ? `big` : `small` } ${mode === btn.id && `active`} flex`

  return(
    <div className={classes} onClick={ ()=> GET_MODE() }>
      {btn.txt}
    </div>
  )
}