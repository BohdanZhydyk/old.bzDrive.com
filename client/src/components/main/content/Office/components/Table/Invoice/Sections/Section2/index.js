import React from 'react'
import './Section2.scss'

import { Info } from './Info'


const Section2 = ({ props:{dealer, buyer, nr, officeFn} })=>{
  return(
    <section className="section2 flex wrap">
      <Info props={{nr, info:dealer, name:"Sprzedawca", officeFn}} />
      <Info props={{nr, info:buyer, name:"Nabywca", officeFn}} />
    </section>
  )
}

export default Section2