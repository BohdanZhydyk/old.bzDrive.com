import React from 'react'


export const Dealer = ({data, nr})=>{
  return(
    <div className={`dealer cell ${ nr === "top" && `black` } flex`}>
      { nr === "top" ? `Sprzedawca` : data}
    </div>
  )
}