import React, { useState, useEffect } from 'react'
import './Office.scss'

import {
  GET_STATE,
  GET_MODE,
  ADD_NEW
} from './actions'

import Loader from './../Loader'
import { ModeBtns } from './components/ModeBtns'
import WorkArea from './components/WorkArea'


const OfficeApp = ({content, user, fn})=>{

  const [office, setOffice] = useState(content)

  let officeFn = (action)=>{
    switch(action.type){
      case "GET_STATE":   GET_STATE(fn);                  break;
      case "GET_MODE":    GET_MODE(fn, action.payload);   break;
      case "ADD_NEW":     ADD_NEW(fn, action.payload);   break;
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

        <ModeBtns props={{btnsMode:office.btns.btnsMode, names:office.btns.names, officeFn}} />

        { office.table && <WorkArea props={{ btns:office.btns, table:office.table, officeFn }} /> }

      </>
    }
    </div>
  )
}

export default OfficeApp