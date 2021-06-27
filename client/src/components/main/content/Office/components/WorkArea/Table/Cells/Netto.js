import React from 'react'


export const Netto = ({data, nr})=>{

  let classes = `netto cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `Kwota Netto` : data}
    </div>
  )
}