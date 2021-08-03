import React from 'react'


export const Comments = ({comments}) => {

  return(
    <div className="comments flex stretch">

      <div className="comL column start"><span className="bold">Uwagi:</span></div>

      <div className="comR flex wrap start">
        { comments.map( (el, index)=> <span key={`Comment${index}`}>{el}</span>) }
      </div>
      
    </div>
  )
}