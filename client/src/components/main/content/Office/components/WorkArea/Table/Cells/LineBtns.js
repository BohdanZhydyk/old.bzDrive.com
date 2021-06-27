import React from 'react'


export const LineBtns = ({btnsMode, data, nr, officeFn})=>{

  const ADD_NEW = ()=> officeFn({type:"ADD_NEW", payload:"new"})

  return(
    <div className={`lineBtns cell ${ nr === "top" && `black` } flex`} onClick={ ()=> ADD_NEW() }>
      { nr === "top" ? `Nowa` : `btns`}
    </div>
  )
}