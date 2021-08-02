import React from 'react'
import './Table.scss'

import { Line } from './Line'
import Invoice from './../Invoice'


const Table = ({ props:{mode, editMode, table, invoice, officeFn} })=>{

  let line = table.lines[0]

  return (
    <div className="table flex column">
    {
      table &&
      <>

        <Line props={{mode, line, nr:"top", invoice, officeFn}} key={`TableLineTop`} />

        { editMode && <Invoice props={{line:editMode, nr:"editing", officeFn}} /> }

        { table.lines.map( (line, nr)=> <Line props={{mode, line, nr, officeFn}} key={`TableLine${nr}`} /> ) }

      </>
    }
    </div>
  )
}

export default Table