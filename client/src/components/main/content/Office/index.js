import React, { useState, useEffect } from 'react'
import './Office.scss'

import {
  GET_STATE,
  GET_MODE
} from './actions'

import { ModeBtns } from './components/ModeBtns'
import Table from './components/Table'
import Loader from './../Loader'


const OfficeApp = ({content, user, fn})=>{

  const [office, setOffice] = useState(content)

  let officeFn = (action)=>{
    switch(action.type){
      case "GET_STATE":   GET_STATE(fn);                  break;
      case "GET_MODE":    GET_MODE(fn, action.payload);   break;
      default: break
    }
  }

  useEffect( ()=>{ !content && officeFn({ type:"GET_STATE" }) },[])

  console.log('office', office)

  return (
    <div className="office">
    {
      !content
      ?
      <Loader />
      :
      <>
        <ModeBtns props={{mode:office.mode, btns:office.btns, officeFn}} />
        <Table props={{mode:office.mode, table:office.table, officeFn}} />
      </>
    }
    </div>
  )
}

export default OfficeApp