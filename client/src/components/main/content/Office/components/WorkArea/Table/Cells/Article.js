import React from 'react'


export const Article = ({data, nr})=>{
  
  let classes = `article cell ${ nr === "top" && `black` } flex`
  
  return(
    <div className={classes}>
      { nr === "top" ? `Towar / Material / Usluga` : data}
    </div>
  )
}