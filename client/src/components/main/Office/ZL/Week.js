import React, { useState, useEffect } from "react"

import { UnixToYYYYMMDD, DigLen } from "../../../../state/functions"
import { DaysLine } from "./DaysLine"
import { Orders } from "./Orders"


export const Week = ({ props:{mode, line, l, user, translate, ReloadFn, officeFn} })=>{

  let week = line.week
  
  const [table, setTable] = useState(line.table)

  const firstDayUnix = line.week[0].unix
  const lastDayUnix = line.week[line.week.length - 1].unix

  let after = firstDayUnix > Date.now()
  
  let query = after
    ? {"dateTo.unix":{ $gte:firstDayUnix - 86400000 }}
    : {
        $and: [
          {"date.unix":{ $lte:lastDayUnix }},
          { $or: [{"dateTo.unix":{ $gte:firstDayUnix }}, {"status":"edited"}] }
        ]
      }


  useEffect(  ()=>{ !table && officeFn( {type:"GET_TABLE", mode, query}, (data)=>{

    setTable(
      data.map( (zl)=>{
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
      }).sort( (a, b)=>{ // sort by length
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
  
  // console.log("week-"+l, week)
  // console.log("table-"+l, table)

  return(
    <div className="Week flex stretch wrap">
    
      {line && <DaysLine props={{mode, week, user, translate, ReloadFn, officeFn}}/>}
      
      {table && <Orders props={{mode, week, table, ReloadFn, officeFn}}/>}

    </div>
  )
}