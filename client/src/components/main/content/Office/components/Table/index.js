import React from 'react'
import './Table.scss'

import BlankInvoice from './BlankInvoice'
import { Line } from './Line'


const Table = ({ props:{mode, table, officeFn} })=>{

  return (
    <div className="table flex column">
    {
      table &&
      <>

        <span className="plus flex">Dodać</span>

        <BlankInvoice />

        <Line line={table[0]} nr="top" />

        { table.map( (line, nr)=> <Line line={line} nr={nr} /> ) }

      </>
    }
    </div>
  )
}

export default Table