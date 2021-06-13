import React from 'react'


export const Brutto = ({data, nr})=>{
  return(
    <div className={`brutto cell ${ nr === "top" && `black` } flex`}>
      { nr === "top" ? `Brutto` : data}
    </div>
  )
}