import React from 'react'


export const Input = ({ props:{printMode, nr, type="text", el, cl="center", val="", pl="wyszukaj...", officeFn} })=>{

  let CHANGE_ARTICLE= (e)=>
    officeFn({
      type:"CHANGE_ARTICLE",
      payload: {form:el, nr, type, val:e.target.value}
    })

  return(
    <>
    {
      printMode
      ?
      <div className={cl}>{val}</div>
      :
      <input
        className={cl} type={type} placeholder={pl} value={val}
        onChange={ (e)=> CHANGE_ARTICLE(e) } 
      />
    }
    </>
  )
}