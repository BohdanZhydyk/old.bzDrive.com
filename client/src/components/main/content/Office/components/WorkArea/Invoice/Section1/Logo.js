import React from 'react'
import { Dealer } from '../../Table/Cells/Dealer'


export const Logo = ({dealer}) => {
  return(
    <div className="logo flex start bold">

      <img src={dealer.img} alt={`Logo-${dealer.id}`} />

      <span className="txtBlk">{dealer.name}</span>
      
    </div>
  )
}