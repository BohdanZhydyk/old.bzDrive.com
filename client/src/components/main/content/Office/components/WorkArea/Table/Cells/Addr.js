import React from 'react'


export const Addr = ({data, nr})=>{

  let classes = `addr cell ${ nr === "top" && `black` } flex`
  
  return(
    <div className={classes}>
      {
        nr === "top"
        ? `Adres`
        :
        <div className="flex column">
          <div>{data[0]}</div>
          <div>{data[1]}</div>
        </div>
      }
    </div>
  )
}