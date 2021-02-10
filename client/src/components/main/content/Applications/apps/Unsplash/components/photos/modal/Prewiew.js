import React from 'react'


export const Prewiew = ({data, actions})=>{
  return(
    <div className="prewiew flex">
      <img className="prewiewImg" src={ data.photo } alt="prewiew" />
    </div>
  )
}