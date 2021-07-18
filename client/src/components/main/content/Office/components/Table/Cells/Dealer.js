import React from 'react'


export const Dealer = ({data, nr})=>{

  let classes = `dealer cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `Sprzedawca` : data}
    </div>
  )
}