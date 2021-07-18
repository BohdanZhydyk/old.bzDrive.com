import React from 'react'
import './Section3.scss'


const Section3 = ({ props:{invoiceNr} }) => {
  return(
    <div className="section3 flex bold">
      <span className="inv flex">Faktura Nr</span>
      <span className="nr flex">{invoiceNr}</span>
    </div>
  )
}

export default Section3