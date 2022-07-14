import React from "react"

import { Order } from "./Order"


export const Orders = ({ props:{mode, week, table, ReloadFn, officeFn} })=>{
  return(
    <>
    {
      table && table.map( (zl, n)=>{

        let orderKey = `Order${n + zl._id}`

        return <Order props={{mode, week, zl, ReloadFn, officeFn}} key={orderKey}/>

      })
    }
    </>
  )
}