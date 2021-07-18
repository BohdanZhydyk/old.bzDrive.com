import React from 'react'

import { Input } from './../../Input'


export const PlaceDate = ({ props:{place, date, nr, officeFn} }) => {

  let input1 = {form:"place", type:"text", legend:"Miejsce wystawienia", val:place, important:true}
  let input2 = {form:"date", type:"text", legend:"Data wystawienia", val:date, important:true}

  return(
    <div className="placeDate">

      <Input props={{nr, input:input1, officeFn}} key={`InvoicePlace${nr}`} />
      
      <Input props={{nr, input:input2, officeFn}} key={`InvoiceDate${nr}`} />

    </div>
  )
}