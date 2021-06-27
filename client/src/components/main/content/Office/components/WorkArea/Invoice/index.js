import React from 'react'
import './Invoice.scss'

import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'
import Section5 from './Section5'
import Section6 from './Section6'


const Invoice = ({ props:{invoice} })=>{

  let dealer = invoice.dealer
  let buyer = invoice.buyer

  return(
    <div className="Invoice flex column">
      
      <Section1 dealer={dealer} />

      <Section2 />

      <Section3 dealer={dealer} buyer={buyer} />

      <Section4 />

      <Section5 />

      <Section6 />

    </div>
  )
}

export default Invoice