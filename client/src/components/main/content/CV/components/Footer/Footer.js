import * as React from 'react'
import './Footer.scss'

export const Footer = ({data})=>{
  return (
    <div className="footer">
      
      <p>{data.rodo1}</p>
      <p>{data.rodo2}</p>
      
    </div>
  )
}