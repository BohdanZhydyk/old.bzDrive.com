import React, { useState, useEffect } from "react"

import { bzUnixToYYYYMMDD } from "../../../../state/functions"
import { DaysLine } from "./DaysLine"
import { Orders } from "./Orders"


export const Week = ({ props:{mode, line, l, user, translate, ReloadFn, officeFn} })=>{

  let week = line.week
  
  const [table, setTable] = useState(line.table)

  const firstDay = line.week[0].YYYYMMDD
  const lastDay = line.week[line.week.length - 1].YYYYMMDD
  
  let query = ( firstDay > bzUnixToYYYYMMDD() )
    ? {"nr.to":{ $gte:firstDay }}
    : {
        $and: [
          {"nr.from":{ $lte:lastDay }},
          { $or: [{"nr.to":{ $gte:firstDay }}, {"status":"edited"}] }
        ]
      }

  useEffect(  ()=>{ !table && officeFn( {type:"GET_TABLE", mode, login:user.login, query}, (data)=>{

    let to = (zl)=> 
      ( zl.status === "edited" ) && ( zl.nr.to < bzUnixToYYYYMMDD() )
      ? bzUnixToYYYYMMDD()
      : zl.nr.to

    setTable(
      data.map( (zl)=> ({ ...zl, nr:{...zl.nr, to: to(zl)} }) )
      .sort( (a, b)=> parseInt(b.nr.to - b.nr.from) - parseInt(a.nr.to - a.nr.from) ) // sort by length
      .sort( (a, b)=> parseInt(a.nr.from) - parseInt(b.nr.from) ) // sort by date
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