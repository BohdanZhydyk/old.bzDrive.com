import React from "react"

import { Order } from "./Order"


export const Orders = ({ props:{mode, week, table, ReloadFn} })=>{
  return(
    <>
    {
      table && table.map( (zl, n)=>{

        let key = `Order${n + zl._id}`

        return <Order props={{mode, week, zl, ReloadFn}} key={key}/>

      })
    }
    </>
  )
}