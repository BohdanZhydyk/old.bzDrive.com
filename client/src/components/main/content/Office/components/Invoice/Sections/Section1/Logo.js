import React from 'react'


export const Logo = ({ props:{printMode, dealer} }) => {
  return(
    <div className={`logo${printMode} flex start bold`}>

      <img src={dealer.img} alt={`Logo-${dealer.id}`} />

      <span>{dealer.shortname}</span>
      
    </div>
  )
}