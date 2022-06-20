import React from 'react'


export const Footer = ({data})=>{
  return (
    <div className="footer boxShadow">
      
      <p>{data.rodo1}</p>
      
      <p>{data.rodo2}</p>
      
    </div>
  )
}