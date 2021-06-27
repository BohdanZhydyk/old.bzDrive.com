import React from 'react'


export const Vat = ({data, nr})=>{

  let classes = `vat cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `VAT` : `${data}%`}
    </div>
  )
}