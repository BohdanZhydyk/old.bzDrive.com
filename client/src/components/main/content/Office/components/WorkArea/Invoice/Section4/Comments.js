import React from 'react'


export const Comments = ({}) => {

  const txt = `
    Dostawa towarów lub świadczenie usług
    zwolnionych od podatku VAT na podstawie
    art. 113 ust. 1 i 9 ustawy o VAT.
  `

  return(
    <span className="comments flex start">
      <span className="bold">Uwagi:</span>
      <span>{txt}</span>
    </span>
  )
}