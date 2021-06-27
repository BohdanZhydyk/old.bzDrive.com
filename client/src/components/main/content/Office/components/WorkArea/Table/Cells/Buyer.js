import React from 'react'


export const Buyer = ({data, nr})=>{

  let classes = `buyer cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `Nabywca` : data}
    </div>
  )
}