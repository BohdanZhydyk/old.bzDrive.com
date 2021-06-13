import React from 'react'


export const Invoice = ({data, nr})=>{
  return(
    <div className={`invoice cell ${ nr === "top" && `black` } flex`}>
      { nr === "top" ? `Faktura Nr.` : data}
    </div>
  )
}