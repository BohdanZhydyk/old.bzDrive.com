import React from 'react'


export const TagP = ({data, mode})=>{
  return (
    <div className="tagWraper">
      {
        mode
        ?
        <textarea className="pEdit txtWht" cols="30" rows="5">{data}</textarea>
        :
        <p className="p">{data}</p>
      }
      
    </div>
  )
}