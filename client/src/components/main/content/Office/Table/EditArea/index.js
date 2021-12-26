import React, { useState } from "react"
import "./EditArea.scss"

import { LineBtns } from "../LineBtns"
import { Area } from "./Area"


const EditArea = ({ props:{mode, line, n, officeFn} })=>{

  const [el, setEl] = useState(line)

  let elFunc = (act)=>{
    switch(act){
      case "Plus":    setEl({...el, open:true, edit:false});      break
      case "Minus":   setEl({...el, open:false, edit:false});     break
      case "More":    setEl({...el, open:!el.open, edit:false});  break
      case "Edit":    setEl({...el, open:true, edit:true});       break
      case "Save":    setEl({...el, open:false, edit:false});     break
      case "Delete":  setEl({...el, open:false, edit:false});     break
      default: return
    }
  }

  return(
    <>
      { <LineBtns props={{el, n, elFunc}} /> }
      { el.open && <Area props={{mode, officeFn, el, elFunc}} /> }
    </>
  )
}

export default EditArea