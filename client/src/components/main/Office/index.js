import { useState, useEffect } from 'react'
import './Office.scss'

import { actions } from './actions'

import { ScreenSaver } from './../../All/ScreenSaver'
import ModeBtns from './ModeBtns'
import Table from './Table'


const OfficeApp = ()=>{

  const [MM_YYYY, setMM_YYYY] = useState(false)

  const [office, setOffice] = useState(false)

  const officeFn = (action)=> actions(action, MM_YYYY, setMM_YYYY, office, setOffice)

  useEffect( ()=>{ !office && officeFn({ type:"GET_STATE" }) },[])

  console.log('office', office)

  let btns = office.btns
  let mode = office.mode
  let table = office.table

  return (
    <div className="office">
    {
      !office
      ? <ScreenSaver />
      :
      <>

        { btns && <ModeBtns props={{btns, mode, officeFn}} /> }

        { table && <Table props={{mode, MM_YYYY, setMM_YYYY, table, officeFn}}/> }

      </>
    }
    </div>
  )
}

export default OfficeApp