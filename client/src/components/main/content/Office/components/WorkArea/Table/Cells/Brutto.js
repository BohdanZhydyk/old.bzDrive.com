import React from 'react'


export const Brutto = ({data, nr})=>{

  let classes = `brutto cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      { nr === "top" ? `Kwota brutto` : data}
    </div>
  )
}