import React from 'react'


export const Quantity = ({data, nr})=>{

  let classes = `quantity cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `Iłość` : data}
    </div>
  )
}