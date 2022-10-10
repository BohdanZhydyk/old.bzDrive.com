import React, { useState, useEffect } from "react"

import "./FI.scss"
import { bzUnixToYYYYMMDD } from "../../../../state/functions"
import { Fn } from "./FiLogic"
import { ScreenSaver } from "./../../../All/ScreenSaver"
import { FiMonth } from "./FiMonth"


const FI = ()=>{

  const [fi, setFi] = useState([])

  const YYYYMM = parseInt( bzUnixToYYYYMMDD() / 100 )

  const dates = {
    $gte: parseInt( YYYYMM + `01` ),
    $lte: parseInt( YYYYMM + `31` )
  }

  const FiLogic = (action)=> Fn(action, fi, setFi)

  useEffect( ()=>{ FiLogic({ type:"GET_FINANCES", dates }) },[])

  // console.log("fi", fi)

  return(
    <div className="FI flex column">

    {
      fi.length === 0
      ? <ScreenSaver />
      : fi?.map( (month, m)=> <FiMonth props={{month, m, FiLogic}} key={`FiMonth${m}`} /> )
    }

    </div>
  )
}

export default FI