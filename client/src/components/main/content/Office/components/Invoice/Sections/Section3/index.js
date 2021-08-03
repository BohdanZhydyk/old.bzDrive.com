import React from 'react'
import './Section3.scss'

import { Info } from './Info'


const Section3 = ({ props:{printMode, dealer, buyer, nr, officeFn} })=>{
  return(
    <section className="section3 flex wrap">

      <Info props={{printMode, nr, info:dealer, name:"Sprzedawca", officeFn}} />

      <Info props={{printMode, nr, info:buyer, name:"Nabywca", officeFn}} />
      
    </section>
  )
}

export default Section3