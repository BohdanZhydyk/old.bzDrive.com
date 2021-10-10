import React from 'react'

import { Input } from './../../Input'


export const PlaceDate = ({ props:{pri, place, date, id, officeFn} }) => {

  let typeVal = pri ? "text" : "date"
  let dateVal = pri
    ? `${date.day}.${date.month}.${date.year}`
    : `${date.year}-${date.month}-${date.day}`

  let input1 = {form:"place", type:"text", legend:"Miejscowość", val:place, important:true}
  let input2 = {form:"date", type:typeVal, legend:"Data", val:dateVal, important:true}

  return(
    <div className="placeDate">

      <Input props={{pri, id, input:input1, officeFn}} key={`JobPlace${id}`} />

      <Input props={{pri, id, input:input2, officeFn}} key={`JobDate${id}`} />

    </div>
  )
}