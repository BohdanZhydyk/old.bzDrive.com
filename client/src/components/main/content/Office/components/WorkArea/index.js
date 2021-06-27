import React from 'react'

import Table from './Table'
import Invoice from './Invoice'


const WorkArea = ({ props:{btns, table, officeFn} })=>{
  return(
    <>
    {
      table.tableMode
      ? <Invoice />
      : <Table props={{btnsMode:btns.btnsMode, table, officeFn}} />
    }
    </>
  )
}

export default WorkArea