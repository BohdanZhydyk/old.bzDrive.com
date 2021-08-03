import React from 'react'
import './Section2.scss'


const Section2 = ({ props:{printMode, invoiceNr} }) => {
  return(
    <div className="section2 flex bold">

      <span className="inv flex">Faktura Nr</span>

      <span className={`nr${printMode} flex`}>{invoiceNr}</span>

    </div>
  )
}

export default Section2