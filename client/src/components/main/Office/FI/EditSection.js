import React, { useState } from "react"

import { bzGetUser } from "../../../../state/functions"
import EditArea from "./../EditArea"


export const EditSection = ({ props:{el, ReloadFn} })=>{

  const [mode, setMode] = useState(false)

  let NEW_DOC = (doc)=> setMode(doc)

  let CANCEL = ()=> setMode(false)

  let btns = [
    {mode:"ZU", txt:"Oplata ZUS"},
    {mode:"PS", txt:"Paragon Sprzedazy"},
    {mode:"PZ", txt:"Paragon Zakupu"},
    {mode:"FZ", txt:"Faktura Zakupu"}
  ]

  let props = {
    mode,
    line:{user:bzGetUser().login},
    CANCEL,
    ReloadFn
  }

  return(
    <div className="EditSection flex wrap">

      {
        btns.map( (btn, i)=>{
          let CLICK = ()=> NEW_DOC(mode ? false : btn.mode)
          let key = `NewDocBtn${i}`
          return( <div className={`NewDocBtn Mode${btn.mode} flex`} onClick={CLICK} key={key}>{btn.txt}</div> )
        })
      }

      { mode && <EditArea props={props} /> }

    </div>
  )
}