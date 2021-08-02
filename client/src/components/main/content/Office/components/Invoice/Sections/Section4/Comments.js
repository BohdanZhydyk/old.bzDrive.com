import React from 'react'


export const Comments = ({comments}) => {

  return(
    <span className="comments flex stretch">

      <div className="comL column start"><span className="bold">Uwagi:</span></div>

      <div className="comR flex wrap start">
        { comments.map( (el, index)=> <span className="" key={`Comment${index}`}>{el}</span>) }
      </div>
      
    </span>
  )
}