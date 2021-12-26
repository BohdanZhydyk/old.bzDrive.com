import React, { useState, useEffect } from 'react'
import './Office.scss'

import { actions } from './actions'

import Loader from './../Loader'
import ModeBtns from './ModeBtns'
import Table from './Table'


const OfficeApp = ()=>{

  const [office, setOffice] = useState(false)

  const officeFn = (action)=> actions(action, office, setOffice)

  useEffect( ()=>{ !office && officeFn({ type:"GET_STATE" }) },[])

  console.log('office', office)

  let btns = office.btns
  let mode = office.mode
  let table = office.table

  return (
    <div className="office">
    {
      !office
      ? <Loader />
      :
      <>

        { btns && <ModeBtns props={{btns, mode, officeFn}} /> }

        { table && <Table props={{mode, table, officeFn}}/> }

      </>
    }
    </div>
  )
}

export default OfficeApp