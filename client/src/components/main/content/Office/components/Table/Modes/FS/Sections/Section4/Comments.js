import React from 'react'


export const Comments = ({ props:{pri, comments} }) => {

  let comment1 = `Dostawa towarów lub świadczenie usług zwolnionych od podatku VAT na podstawie art. 113 ust. 1 i 9 ustawy o VAT.`

  return(
    <div className="comments flex stretch">
    {
      !pri &&
      <>
        <div className="comL column start"><span className="bold">Uwagi:</span></div>

        <div className="comR flex wrap start">
          { comments.map( (el, index)=> <span key={`Comment${index}`}>{el}</span>) }
        </div>
      </>
    }
    </div>
  )
}