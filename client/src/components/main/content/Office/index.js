import React, { useState, useEffect } from 'react'
import './Office.scss'

import { actions } from './actions'

import Loader from './../Loader'
import ModeBtns from './components/ModeBtns'
import Table from './components/Table'


const OfficeApp = ()=>{

  const [office, setOffice] = useState(false)

  const officeFn = (action)=> actions(action, office, setOffice)

  useEffect( ()=>{ !office && officeFn({ type:"GET_STATE" }) },[])

  console.log('office', office)

  let mode, btns, pri, edi, table

  if(office){
    mode = office.mode
    btns = office.btns
    table = office.table
  }

  return (
    <div className="office">
    {
      !office
      ? <Loader />
      :
      <>

        <ModeBtns props={{mode, btns, officeFn}} />

        { table && <Table props={{mode, table, officeFn}} /> }

      </>
    }
    </div>
  )
}

export default OfficeApp