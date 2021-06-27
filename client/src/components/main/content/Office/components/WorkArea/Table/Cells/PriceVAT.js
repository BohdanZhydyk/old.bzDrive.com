import React from 'react'


export const PriceVAT = ({data, nr})=>{

  let classes = `priceVAT cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `Kwota VAT` : data }
    </div>
  )
}