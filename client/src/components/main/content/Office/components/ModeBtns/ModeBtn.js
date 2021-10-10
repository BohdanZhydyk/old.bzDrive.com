import React from 'react'


export const ModeBtn = ({ props: {mode, btn, officeFn} })=>{

  let GET_MODE = ()=> officeFn({type:"GET_MODE", payload:btn.id})

  let classes = `funcBtn ${ !mode ? `big` : `small` } ${mode === btn.id && `active`} flex`

  return(
    <div className={classes} onClick={ ()=> GET_MODE() }>
      {btn.txt}
    </div>
  )
}