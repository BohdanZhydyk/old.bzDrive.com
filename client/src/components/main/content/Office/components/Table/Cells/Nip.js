import React from 'react'


export const Nip = ({data, nr})=>{

  let classes = `nip cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `NIP` : data}
    </div>
  )
}