import React from 'react'


export const Number = ({data, nr})=>{

  let classes = `number cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `Artykul` : data}
    </div>
  )
}