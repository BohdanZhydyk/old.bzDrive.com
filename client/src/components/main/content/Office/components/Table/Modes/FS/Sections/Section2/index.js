import React from 'react'
import './Section2.scss'


const Section2 = ({ props:{pri, invoiceNr} }) => {
  return(
    <div className="section2 flex bold">

      <span className="inv flex">Zlecenie Nr</span>

      <span className={`nr${pri} flex`}>{invoiceNr}</span>

    </div>
  )
}

export default Section2