import React, { useState, useEffect } from 'react'
import './Office.scss'

import {
  GET_STATE,
  GET_MODE,
  ADD_INVOICE,
  CHANGE_INPUT,
  CHANGE_ARTICLE,
  LINE_CLICK,
  CONFIRM_BTNS
} from './actions'

import Loader from './../Loader'
import ModeBtns from './components/ModeBtns'
import Table from './components/Table'


const OfficeApp = ({content, user, fn})=>{

  const [office, setOffice] = useState(content)

  let officeFn = (action)=>{
    switch(action.type){
      case "GET_STATE":       GET_STATE(fn);                                      break;
      case "GET_MODE":        GET_MODE(fn, action.payload);                       break;
      case "ADD_INVOICE":     ADD_INVOICE(fn);                                    break;
      case "CHANGE_INPUT":    CHANGE_INPUT(office, setOffice, action.payload);    break;
      case "CHANGE_ARTICLE":  CHANGE_ARTICLE(office, setOffice, action.payload);  break;
      case "LINE_CLICK":      LINE_CLICK(office, setOffice, action.payload);      break;
      case "CONFIRM_BTNS":    CONFIRM_BTNS(office, setOffice, action.payload);    break;
      default: break;
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

        { table && <Table props={{table, invoice, officeFn}} /> }

      </>
    }
    </div>
  )
}

export default OfficeApp