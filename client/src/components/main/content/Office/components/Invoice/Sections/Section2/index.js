import React from 'react'
import './Section2.scss'

import { Info } from './Info'


const Section2 = ({ props:{printMode, dealer, buyer, nr, officeFn} })=>{
  return(
    <section className="section2 flex wrap">

      <Info props={{printMode, nr, info:dealer, name:"Sprzedawca", officeFn}} />

      <Info props={{printMode, nr, info:buyer, name:"Nabywca", officeFn}} />
      
    </section>
  )
}

export default Section2