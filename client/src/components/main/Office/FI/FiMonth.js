import React, { useState } from "react"


import { Chart } from "./Chart"
import { FiToBase } from "./FiToBase"
import { FiLines } from "./FiLines"
import { EditSection } from "./EditSection"


export const FiMonth = ({ props:{month, m, FiLogic} })=>{

  const [show, setShow] = useState(false)

  const dates = {
    $gte: parseInt( `${month.date}01` ),
    $lte: parseInt( `${month.date}31` )
  }

  let ReloadFn = ()=>{ FiLogic({ type:"GET_FINANCES", dates, nr:m }) }

  return(
    <div className={`FiMonth flex column`}>

      <Chart props={{month, m, show, setShow, FiLogic}} key={`FiChart${m}`} />

      { show && <FiToBase props={{month, m, FiLogic}} /> }

      { show && <EditSection props={{ReloadFn}} /> }

      { show && <FiLines props={{month, m, dates, FiLogic, ReloadFn}} /> }

    </div>
  )
}