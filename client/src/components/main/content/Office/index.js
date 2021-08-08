import React, { useState, useEffect } from 'react'
import './Office.scss'

import { actions } from './actions'

import Loader from './../Loader'
import ModeBtns from './components/ModeBtns'
import Table from './components/Table'
import Invoice from './components/Invoice'


const OfficeApp = ()=>{

  const [office, setOffice] = useState(false)

  const officeFn = (action)=> actions(action, office, setOffice)

  useEffect( ()=>{ !office && officeFn({ type:"GET_STATE" }) },[])

  console.log('office', office)

  let printMode, editMode, mode, btns, names, table, invoice

  if(office){
    printMode = office.printing
    editMode = office.editing
    mode = office.mode
    btns = office.btns
    names = btns.names
    table = office.table
    invoice = office.invoice
  }


  return (
    <div className="office">
    {
      !office
      ? <Loader />
      :
      <>

        { printMode && <Invoice props={{line:printMode, nr:"print", officeFn}} /> }

        <ModeBtns props={{mode, names, officeFn}} />

        { table && <Table props={{mode, editMode, table, invoice, officeFn}} /> }

      </>
    }
    </div>
  )
}

export default OfficeApp