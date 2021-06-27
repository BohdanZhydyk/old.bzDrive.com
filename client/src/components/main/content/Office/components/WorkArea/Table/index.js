import React from 'react'
import './Table.scss'

import { Line } from './Line'


const Table = ({ props:{table, officeFn} })=>{

  let line = table.lines[0]

  return (
    <div className="table flex column">
    {
      table &&
      <>

        <Line props={{line, nr:"top", officeFn}} key={`TableLineTop`} />

        { table.lines.map( (line, nr)=> <Line props={{line, nr, officeFn}} key={`TableLine${nr}`} /> ) }

      </>
    }
    </div>
  )
}

export default Table