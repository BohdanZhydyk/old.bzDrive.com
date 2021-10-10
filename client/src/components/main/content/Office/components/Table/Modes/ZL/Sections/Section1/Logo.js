import React from 'react'


export const Logo = ({ props:{pri, dealer} }) => {
  return(
    <div className={`logo${pri} flex start bold`}>

      <img src={dealer.img} alt={`Logo-${dealer.id}`} />

      <span>{dealer.shortname}</span>
      
    </div>
  )
}