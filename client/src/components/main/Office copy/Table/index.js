import React from 'react'

import { FS } from './Modes/FS'
import { FZ } from './Modes/FZ'
import { ZL } from './Modes/ZL'
import { TO } from './Modes/TO'
import { KL } from './Modes/KL'
import { SP } from './Modes/SP'
import { ToPast } from "./Modes/ToPast"


const Table = ({ props:{mode, MM_YYYY, setMM_YYYY, table, officeFn} })=>{
  return(
    <div className="Table flex wrap">

      { mode === "FS" && <FS props={{mode, table, officeFn}}/> }
      { mode === "FZ" && <FZ props={{mode, table, officeFn}}/> }
      { mode === "ZL" && <ZL props={{mode, table, officeFn}}/> }
      { mode === "TO" && <TO props={{mode, table, officeFn}}/> }
      { mode === "KL" && <KL props={{mode, table, officeFn}}/> }
      { mode === "SP" && <SP props={{mode, table, officeFn}}/> }

      <ToPast props={{ mode, table, MM_YYYY, setMM_YYYY, officeFn }} />

    </div>
  )
}

export default Table