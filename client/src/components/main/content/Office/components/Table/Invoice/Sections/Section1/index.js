import React from 'react'
import './Section1.scss'

import { Logo } from './Logo'
import { PlaceDate } from './PlaceDate'


const Section1 = ({ props:{dealer, place, date, nr, officeFn} }) => {
  return(
    <section className="section1 flex">

      <Logo dealer={dealer} />

      <PlaceDate props={{place, date, nr, officeFn}} />

    </section>
  )
}

export default Section1