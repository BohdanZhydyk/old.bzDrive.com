import React from 'react'


export const Logo = ({dealer}) => {
  return(
    <div className="logo flex start bold">

      <img src={dealer.img} alt={`Logo-${dealer.id}`} />

      <span>{dealer.shortName}</span>
      
    </div>
  )
}