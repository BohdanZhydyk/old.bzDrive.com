import React, { useState, useEffect } from "react"

import "./../Office.scss"
import "./FS.scss"
import { bzUnixToDateTime, bzGetUser, DateToUnix } from "./../../../../state/functions"
import { officeFn } from "../actions"
import Settings from "../Settings"
import { Title } from "./Title"
import { ScreenSaver } from "./../../../All/ScreenSaver"
import SearchPannel from "../SearchPannel"
import { Invoice } from "./Invoice"
import { EmptyList } from "./EmptyList"


const FS = ()=>{

  const mode = "FS"

  const [searchSt, setSearchSt] = useState( false )

  const user = bzGetUser()
  const lang = user.lang

  const [invoices, setInvoices] = useState( false )

  const [nip, setNIP] = useState("")

  const [client, setClient] = useState("")

  const [from, setFrom] = useState({
    year:bzUnixToDateTime().year,
    month:bzUnixToDateTime().month,
    day:1
  })

  const [to, setTo] = useState({
    year:bzUnixToDateTime().year,
    month:bzUnixToDateTime().month,
    day:bzUnixToDateTime().lastDay
  })
  
  const GET_FS_TABLE = (query, cb)=> officeFn(
    {
      type:"GET_TABLE",
      mode,
      query: (user.login === "Anna")
        ? query
        : {...query, user:user.login}
    },
    (data)=> cb(data)
  )

  const invFn = (action)=>{

    let from = action.from
    let to = action.to
    let client = action.client.length > 0 ? action.client : false
    let nip = action.nip.length > 0 ? action.nip : false

    let query1 = (client)
      ? {
          $or:[
            {"buyer.name":{ $regex:client.toUpperCase() }},
            {"buyer.name":{ $regex:client.toLowerCase() }},
            {"buyer.name":{
              $regex:(client.toLowerCase().charAt(0).toUpperCase() + client.toLowerCase().slice(1))
            }}
          ]
        }
      : {}
    let query2 = (nip) ? { "buyer.nip":{$regex:nip} } : {}
    let query3 = (from && to) ? { "date.unix":{$gte:DateToUnix(from), $lte:DateToUnix(to)} } : {}

    switch(action.type){
      case "CHG_FROM":
        setFrom({...action.value})
        GET_FS_TABLE(
          { $and: [query1, query2, query3] },
          (data)=> setInvoices(data)
        )
        return
      case "CHG_TO":
        setTo({...action.value})
        GET_FS_TABLE(
          { $and: [query1, query2, query3] },
          (data)=> setInvoices(data)
        )
        return
      case "SEARCH":
        setFrom({...action.from}); setTo({...action.to}); setSearchSt( true )
        GET_FS_TABLE(
          { $and: [query1, query2, query3] },
          (data)=> setInvoices(data)
        )
        return
      default: return
    }
  }

  useEffect( ()=>{
    !invoices &&
    GET_FS_TABLE(
      {
        $and:[
          {"nr.year":bzUnixToDateTime().year},
          {"nr.month":bzUnixToDateTime().month}
        ]
      },
      (data)=> setInvoices(data)
    )
  },[])

  let ReloadFn = ()=>{
    setInvoices(false);
    GET_FS_TABLE(
      {
        $and:[
          {"nr.year":bzUnixToDateTime().year},
          {"nr.month":bzUnixToDateTime().month}
        ]
      },
      (data)=> setInvoices(data)
    )
  }

  // console.log("invoices", invoices)

  return(
    <div className="office flex column">
    {
      !invoices
      ? <ScreenSaver />
      :
      <div className="FS flex column">

        <Settings props={{user}} />

        <Title props={{mode, searchSt, lang, from, to}}/>

        <SearchPannel props={{mode, nip, client, from, to, Fn:invFn}}/>

        {
          [ {}, ...invoices ].map( (line, n)=>

            <Invoice props={{mode, line, n, ReloadFn, officeFn}} key={`FS_Line${n}${line._id}`}/>

          )
        }

        { invoices.length === 0 && <EmptyList /> }
        
      </div>
    }
    </div>
  )
}

export default FS