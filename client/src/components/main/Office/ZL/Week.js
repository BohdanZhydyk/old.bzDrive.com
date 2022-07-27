import React, { useState, useEffect } from "react"

import { DaysLine } from "./DaysLine"
import { Orders } from "./Orders"


export const Week = ({ props:{mode, line, l, user, translate, ReloadFn, officeFn} })=>{

  let week = line.week
  
  const [table, setTable] = useState(line.table)

  const firstEl = line.week[line.week.length - 1]
  const lastEl = line.week[0]

  let query = {
    $and: [
      {"date.year": { $lte: parseInt(firstEl.year) }},
      {"date.month": { $lte: parseInt(firstEl.month) }},
      {"date.day": { $lte: parseInt(firstEl.day) }},
      {
        $or: [
          {
            $and: [
              {"dateTo.year": { $gte: parseInt(lastEl.year) }},
              {"dateTo.month": { $gte: parseInt(lastEl.month) }},
              {"dateTo.day": { $gte: parseInt(lastEl.day) }},
            ]
          },
          {"status":"edited"}
        ]
      }
    ]
  }

  useEffect(  ()=>{ !table && officeFn( {type:"GET_TABLE", mode, query}, (data)=>{

    let newResult = data
    .map( (zl)=>{
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
    .sort( (a, b)=>{ // sort by length
      let A = parseInt(a.dateTo.unix - a.date.unix)
      let B = parseInt(b.dateTo.unix - b.date.unix)
      return (B - A)
    })
    .sort( (a, b)=>{ // sort by unix
      let A = parseInt(a.date.unix)
      let B = parseInt(b.date.unix)
      return (A - B)
    })

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
  console.log("table-"+l, table)

  return(
    <div className="Week flex stretch wrap">
    
      {line && <DaysLine props={{mode, week, user, translate, ReloadFn, officeFn}}/>}
    
      {table && <Orders props={{mode, week, table, ReloadFn, officeFn}}/>}

    </div>
  )
}