import React from 'react'
import './Table.scss'

import Invoice from './Invoice'
import { Line } from './Line'


const Table = ({ props:{table, invoice, officeFn} })=>{

  let line = table.lines[0]

  return (
    <div className="table flex column">
    {
      table &&
      <>

        <Line props={{line, nr:"top", invoice, officeFn}} key={`TableLineTop`} />

        {
          table.lines.map( (line, nr)=>
            line.status === "editing"
            ? <Invoice props={{line, nr, officeFn}} key={`Invoice${nr}`} />
            : <Line props={{line, nr, officeFn}} key={`TableLine${nr}`} />
          )
        }

      </>
    }
    </div>
  )
}

export default Table