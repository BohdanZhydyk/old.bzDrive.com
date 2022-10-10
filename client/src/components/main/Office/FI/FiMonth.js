import React, { useState } from "react"


import { Chart } from "./Chart"
import { FiLines } from "./FiLines"


export const FiMonth = ({ props:{month, m, FiLogic} })=>{

  const [show, setShow] = useState(true)

  return(
    <div className={`FiMonth flex column`}>

      <Chart props={{month, m, FiLogic}} key={`FiChart${m}`} />

      { show && <FiLines props={{month, m, FiLogic}} /> }

    </div>
  )
}