import React, { useState, useEffect } from "react"

import { WeekDaysLine } from "./WeekDaysLine"
import { Orders } from "./Orders"


export const Week = ({ props:{mode, week, GetDay, lang, translate, ReloadFn, officeFn} })=>{

  const [table, setTable] = useState(false)

  let query = {
    $and: [
      {"date.unix": { $lte: week[week.length - 1].unix }},
      { $or: [
        {"dateTo.unix":{ $gte: week[0].unix }},
        {"status":"edited"}
      ]}
    ]
  }

  useEffect( ()=>{ !table && officeFn( {type:"GET_TABLE", mode, query}, (data)=>{

    let newResult = data.map( (zl)=>{
      return({
        ...zl,
        dateTo: {
          ...zl.dateTo,
          unix:
            ( zl.status === "edited" ) && ( zl.dateTo.unix < Date.now() )
            ? Date.now()
            : zl.dateTo.unix
        }
      })
    })

    setTable(
      newResult.sort( (a, b)=>{ // sort by length
        let A = parseInt(a.dateTo.unix - a.date.unix)
        let B = parseInt(b.dateTo.unix - b.date.unix)
        return (B - A)
      }).sort( (a, b)=>{ // sort by unix
        let A = parseInt(a.date.unix)
        let B = parseInt(b.date.unix)
        return (A - B)
      })
    )

  }) },[])

  // console.log("table", table)

  return(
    <div className="Week flex stretch wrap">
    
      <WeekDaysLine props={{mode, week, table, GetDay, lang, translate, ReloadFn, officeFn}}/>
    
      <Orders props={{mode, week, table, ReloadFn, officeFn}}/>

    </div>
  )
}