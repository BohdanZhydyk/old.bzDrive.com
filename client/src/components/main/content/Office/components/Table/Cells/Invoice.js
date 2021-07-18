import React from 'react'


export const Invoice = ({data, nr})=>{

  let classes = `invoice cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `Faktura Nr.` : data}
    </div>
  )
}