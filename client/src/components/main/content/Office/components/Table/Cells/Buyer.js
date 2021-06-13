import React from 'react'


export const Buyer = ({data, nr})=>{
  return(
    <div className={`buyer cell ${ nr === "top" && `black` } flex`}>
      { nr === "top" ? `Nabywca` : data}
    </div>
  )
}