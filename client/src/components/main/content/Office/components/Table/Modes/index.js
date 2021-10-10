import React from 'react'
import './Modes.scss'

import { Buttons } from './Buttons'
import { CloseBtn } from './CloseBtn'
import FS from './FS'
// import ZL from './ZL'


const Modes = ({ props:{mode, line, officeFn} })=>{

  return(
    <div className={`modes flex start column`}>

    { line.edi && <Buttons props={{line, officeFn}} /> }
    { line.pri && <CloseBtn props={{line, officeFn}} /> }

    { mode === "FS" && <FS props={{mode, line, id:line._id, officeFn}} /> }
    {/* { mode === "ZL" && <ZL props={{mode, line, id:line._id, officeFn}} /> } */}

    { line.edi && <Buttons props={{line, officeFn}} /> }

    </div>
  )
}

export default Modes