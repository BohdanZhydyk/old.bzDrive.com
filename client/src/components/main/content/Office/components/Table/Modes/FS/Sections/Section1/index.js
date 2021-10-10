import React from 'react'
import './Section1.scss'

import { Logo } from './Logo'
import { PlaceDate } from './PlaceDate'


const Section1 = ({ props:{pri, dealer, place, date, id, officeFn} }) => {
  return(
    <section className="section1 flex">

      <Logo props={{pri, dealer}} />

      <PlaceDate props={{pri, place, date, id, officeFn}} />

    </section>
  )
}

export default Section1