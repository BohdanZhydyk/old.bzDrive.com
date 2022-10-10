import React, { useState } from "react"

import { bzGetUser } from "../../../../state/functions"
import EditArea from "./../EditArea"


export const EditSection = ({ props:{} })=>{

  const [mode, setMode] = useState(false)

  let NEW_DOC = (doc)=> setMode(doc)

  let CANCEL = ()=> setMode(false)

  let btns = [
    {mode:"ZU", txt:"Oplata ZUS"},
    {mode:"PG", txt:"Paragon"},
    {mode:"FZ", txt:"Faktura Zakupu"},
    {mode:"ZA", txt:"Zakup bez faktury"},
  ]

  let props = {
    mode,
    line:{user:bzGetUser().login},
    CANCEL,
    ReloadFn:()=>{}
  }

  return(
    <div className="EditSection flex wrap">

      {
        btns.map( (btn, i)=>{
          let CLICK = ()=>NEW_DOC(btn.mode)
          let key = `NewDocBtn${i}`
          return( <div className="NewDocBtn flex" onClick={CLICK} key={key}>{btn.txt}</div> )
        })
      }

      { mode && <EditArea props={props} /> }

    </div>
  )
}