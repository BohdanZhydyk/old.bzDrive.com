import React from 'react'
import './Table.scss'

import { Line } from './Line'


const Table = ({ props:{btnsMode, table, officeFn} })=>{

  return (
    <div className="table flex column">
    {
      table &&
      <>

        {/* <span className="plus flex">Dodać</span> */}

        <Line btnsMode={btnsMode} line={table.lines[0]} nr="top" officeFn={officeFn} />

        { table.lines.map( (line, nr)=> <Line btnsMode={btnsMode} line={line} nr={nr} officeFn={officeFn} /> ) }


      </>
    }
    </div>
  )
}

export default Table