import React from 'react'

import { FS } from './Modes/FS'
import { FZ } from './Modes/FZ'
import { ZL } from './Modes/ZL'
import { TO } from './Modes/TO'
import { KL } from './Modes/KL'
import { SP } from './Modes/SP'


const Table = ({ props:{mode, table, officeFn} })=>{
  return(
    <div className="Table flex wrap">
      { mode === "FS" && <FS props={{mode, table, officeFn}}/> }
      { mode === "FZ" && <FZ props={{mode, table, officeFn}}/> }
      { mode === "ZL" && <ZL props={{mode, table, officeFn}}/> }
      { mode === "TO" && <TO props={{mode, table, officeFn}}/> }
      { mode === "KL" && <KL props={{mode, table, officeFn}}/> }
      { mode === "SP" && <SP props={{mode, table, officeFn}}/> }
    </div>
  )
}

export default Table