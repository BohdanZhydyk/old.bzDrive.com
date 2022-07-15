import React, { useState, useEffect } from "react"

import "./../Office.scss"
import "./FS.scss"
import { unixToDateTimeConverter, bzGetUser } from "./../../../../state/functions"
import { officeFn } from "../actions"
import { Title } from "./Title"
import { ScreenSaver } from "./../../../All/ScreenSaver"
import { SearchPannel } from "./SearchPannel"
import { Invoice } from "./Invoice"
import { EmptyList } from "./EmptyList"


const FS = ()=>{

  const mode = "FS"

  const user = bzGetUser()
  const lang = user.lang

  const [invoices, setInvoices] = useState( false )

  const [nip, setNIP] = useState("")

  const [client, setClient] = useState("")

  const [from, setFrom] = useState({
    year:unixToDateTimeConverter().year,
    month:unixToDateTimeConverter().month,
    day:1
  })

  const [to, setTo] = useState({
    year:unixToDateTimeConverter().year,
    month:unixToDateTimeConverter().month,
    day:unixToDateTimeConverter().lastDay
  })
  
  const GET_TABLE = (from, to)=>{
    let query = {
      $and: [
        {"nr.year":{ $gte:from.year, $lte:to.year }},
        {"nr.month":{ $gte:from.month, $lte:to.month }},
        {"nr.day":{ $gte:from.day, $lte:to.day }}
      ]
    }
    officeFn( {type:"GET_TABLE", mode, query}, (data)=>{ setInvoices(data)} )
  }

  useEffect( ()=>{ !invoices && GET_TABLE(from, to) },[])

  const invFn = (action)=>{
    switch(action.type){
      case "CHG_FROM":  setFrom({...action.value}); GET_TABLE(action.value, to);  return
      case "CHG_TO":    setTo({...action.value}); GET_TABLE(from, action.value);  return
      default: return
    }
  }

  let ReloadFn = ()=>{ setInvoices(false); GET_TABLE(from, to) }

  // console.log("invoices", invoices)

  return(
    <div className="office flex column">
    {
      !invoices
      ? <ScreenSaver />
      :
      <div className="FS flex column">

        <Title props={{mode, lang, from, to}}/>

        <SearchPannel props={{nip, client, from, to, invFn}}/>

        {
          [ {}, ...invoices ].map( (line, n)=>

            <Invoice props={{mode, line, n, ReloadFn, officeFn}} key={`FS_Line${n}${line._id}`}/>

          )
        }

        <EmptyList props={{invoices}}/>
        
      </div>
    }
    </div>
  )
}

export default FS