import React from 'react'

import { unixToDateConverter } from './../../../../../../../../store/functions'


export const PlaceDate = ({dealer}) => {

  let left = "left flex end bold"
  let right = "right flex start"
  let txt1 = "Miejsce wystawienia:"
  let txt2 = "Data wystawienia:"

  return(
    <div className="placeDate flex wrap">

      <div className={left}>{txt1}</div>
      <div className={right}>{dealer.place}</div>

      <div className={left}>{txt2}</div>
      <div className={right}>{unixToDateConverter()}</div>

    </div>
  )
}