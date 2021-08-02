import React from 'react'


export const ModeBtn = ({ props: {mode, btn, officeFn} })=>{

  let GET_MODE = ()=> officeFn({type:"GET_MODE", payload:btn.id})

  let btnsMode = (mode === btn.id)

  let classes = `funcBtn ${ !mode ? `big` : `small` } ${btnsMode && `active`} flex`

  return(
    <div className={classes} onClick={ ()=> GET_MODE() }>
      {btn.txt}
    </div>
  )
}