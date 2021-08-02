import React, { useState, useEffect } from 'react'
import './Office.scss'

import {
  GET_STATE,
  GET_MODE,
  ADD_INVOICE,
  DELETE_INVOICE,
  PRINT_INVOICE,
  EXIT_PRINT_MODE,
  EXIT_EDIT_MODE,
  SAVE_INVOICE,
  EDIT_INVOICE,
  CHANGE_INPUT,
  CHANGE_ARTICLE,
  LINE_CLICK
} from './actions'

import Loader from './../Loader'
import ModeBtns from './components/ModeBtns'
import Table from './components/Table'
import Invoice from './components/Invoice'


const OfficeApp = ({content, user, fn})=>{

  const [office, setOffice] = useState(content)

  let officeFn = (action)=>{
    switch(action.type){
      case "GET_STATE":       GET_STATE(fn);                                      break;
      case "GET_MODE":        GET_MODE(fn, action.payload);                       break;
      case "ADD_INVOICE":     ADD_INVOICE(fn);                                    break;
      case "SAVE_INVOICE":    SAVE_INVOICE(fn, action.payload);                   break;
      case "EDIT_INVOICE":    EDIT_INVOICE(fn, action.payload);                   break;
      case "PRINT_INVOICE":   PRINT_INVOICE(fn, action.payload);                  break;
      case "DELETE_INVOICE":  DELETE_INVOICE(fn, action.payload);                 break;
      case "EXIT_PRINT_MODE": EXIT_PRINT_MODE(office, setOffice);                 break;
      case "EXIT_EDIT_MODE":  EXIT_EDIT_MODE(office, setOffice);                  break;
      case "CHANGE_INPUT":    CHANGE_INPUT(office, setOffice, action.payload);    break;
      case "CHANGE_ARTICLE":  CHANGE_ARTICLE(office, setOffice, action.payload);  break;
      case "LINE_CLICK":      LINE_CLICK(office, setOffice, action.payload);      break;
      default: break;
    }
  }

  useEffect( ()=>{ !content && officeFn({ type:"GET_STATE" }) },[])

  console.log('office', office)

  let printMode, editMode, mode, btns, names, table, invoice

  if(content){
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
      !content
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