import React from 'react'

import Table from './Table'
import Invoice from './Invoice'


const WorkArea = ({ props:{table, invoice, officeFn} })=>{
  return(
    <>
    {
      !table.tableMode
      ? <Table props={{table, officeFn}} />
      : <Invoice props={{invoice}}/>
    }
    </>
  )
}

export default WorkArea