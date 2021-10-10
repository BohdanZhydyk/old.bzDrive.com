import React from 'react'
import './Section3.scss'

import { Info } from './Info'


const Section3 = ({ props:{pri, dealer, buyer, id, officeFn} })=>{
  return(
    <section className="section3 flex wrap">

      <Info props={{pri, id, info:dealer, name:"Sprzedawca", officeFn}} />

      <Info props={{pri, id, info:buyer, name:"Nabywca", officeFn}} />
      
    </section>
  )
}

export default Section3