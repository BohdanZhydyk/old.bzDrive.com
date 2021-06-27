import React, { useState, useEffect } from 'react'
import './Office.scss'

import {
  GET_STATE,
  GET_MODE,
  ADD_INVOICE
} from './actions'

import Loader from './../Loader'
import ModeBtns from './components/ModeBtns'
import WorkArea from './components/WorkArea'


const OfficeApp = ({content, user, fn})=>{

  const [office, setOffice] = useState(content)

  let officeFn = (action)=>{
    switch(action.type){
      case "GET_STATE":       GET_STATE(fn);                  break;
      case "GET_MODE":        GET_MODE(fn, action.payload);   break;
      case "ADD_INVOICE":     ADD_INVOICE(fn);   break;
      default: break
    }
  }

  useEffect( ()=>{ !content && officeFn({ type:"GET_STATE" }) },[])

  console.log('office', office)

  let btns, btnsMode, names, table, invoice

  if(content){
    btns = office.btns
    btnsMode = btns.btnsMode
    names = btns.names
    table = office.table
    invoice = office.invoice
  }


  return (
    <div className="office">
    {
      !content
      ? <Loader />
      :
      <>

        <ModeBtns props={{btnsMode, names, officeFn}} />

        { table && <WorkArea props={{table, invoice, officeFn}} /> }

      </>
    }
    </div>
  )
}

export default OfficeApp