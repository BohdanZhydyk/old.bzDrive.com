import React, { useState, useEffect } from "react"

import "./FI.scss"
import { Fn } from "./FiLogic"
import { ScreenSaver } from "./../../../All/ScreenSaver"
import { FiMonth } from "./FiMonth"


const FI = ()=>{

  const [fi, setFi] = useState(false)

  const FiLogic = (action)=> Fn(action, fi, setFi)

  useEffect( ()=>{ !fi && FiLogic({ type:"GET_FI" }) },[])

  // console.log("fi", fi)

  return(
    <div className="FI flex column">

    {
      !fi
      ? <ScreenSaver />
      : fi?.map( (month, m)=> <FiMonth props={{month, m, FiLogic}} key={`FiMonth${m}`} /> )
    }

    </div>
  )
}

export default FI