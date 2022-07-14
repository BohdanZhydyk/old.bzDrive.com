import React, { useState, useEffect } from "react"

import "./../Office.scss"
import "./FS.scss"
import { translate } from "./../../../../state/translate"
import {
  unixToDateTimeConverter,
  bzGetUser,
  TwoDig
} from "./../../../../state/functions"
import { officeFn } from "../actions"
import { ScreenSaver } from "./../../../All/ScreenSaver"
import { Input } from "./../../../All/Input"
import { Invoice } from "./Invoice"


const FS = ()=>{

  const mode = "FS"

  const lang = bzGetUser().lang

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

  const MonthNames = translate(lang, "MonthNames")

  const invFn = (action)=>{
    switch(action.type){
      case "CHG_FROM":
        setFrom({...action.value})
        GET_TABLE(action.value, to)
        return
      case "CHG_TO":
        setTo({...action.value})
        GET_TABLE(from, action.value)
        return
      default: return
    }
  }
  
  let nipInput = {form:"NIP", type:"text", legend:"NIP", val:nip}
  let clientInput = {form:"CLIENT", type:"text", legend:"Client", val:client}
  let fromInput = {form:"FROM", type:"date", legend:"Od", val:from}
  let toInput = {form:"TO", type:"date", legend:"Do", val:to}

  let title = `${translate(lang, mode)}:
    ${TwoDig(from.day)} ${MonthNames[parseInt(from.month - 1)]} ${from.year} -
    ${TwoDig(to.day)} ${MonthNames[parseInt(to.month - 1)]} ${to.year}`

  let ReloadFn = ()=>{ setInvoices(false); GET_TABLE(from, to) }

  // console.log("invoices", invoices)

  return(
    <div className="office flex column">
    {
      !invoices
      ? <ScreenSaver />
      :
      <div className="FS flex column">

        <span className="title flex bold">{title}</span>

        <div className="SearchPannel flex end">
          <Input props={{input:nipInput, Fn:invFn}} />
          <Input props={{input:clientInput, Fn:invFn}} />
          <Input props={{input:fromInput, Fn:invFn}} />
          <Input props={{input:toInput, Fn:invFn}} />
        </div>

        {
          [ {}, ...invoices ].map( (line, n)=>{

            let key = `FS_Line${n}${line._id}`

            return( <Invoice props={{mode, line, n, ReloadFn, officeFn}} key={key}/> )

          })
        }

        { invoices.length === 0 && <span>niema</span> }
        
      </div>
    }
    </div>
  )
}

export default FS