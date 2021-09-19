import React from 'react'

import { Input } from './../../Input'


export const PlaceDate = ({ props:{printMode, place, date, nr, officeFn} }) => {

  let invoiceType = printMode ? "text" : "date"
  let invoiceDate = printMode
    ? `${date.day}.${date.month}.${date.year}`
    : `${date.year}-${date.month}-${date.day}`

  let input1 = {form:"place", type:"text", legend:"Miejsce wystawienia", val:place, important:true}
  let input2 = {form:"date", type:invoiceType, legend:"Data wystawienia", val:invoiceDate, important:true}

  return(
    <div className="placeDate">

      <Input props={{printMode, nr, input:input1, officeFn}} key={`InvoicePlace${nr}`} />

      <Input props={{printMode, nr, input:input2, officeFn}} key={`InvoiceDate${nr}`} />

    </div>
  )
}