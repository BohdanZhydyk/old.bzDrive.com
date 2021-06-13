import React from 'react'


export const Netto = ({data, nr})=>{
  return(
    <div className={`netto cell ${ nr === "top" && `black` } flex`}>
      { nr === "top" ? `Netto` : data}
    </div>
  )
}