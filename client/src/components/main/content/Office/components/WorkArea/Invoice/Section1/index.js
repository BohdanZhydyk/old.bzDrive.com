import React from 'react'
import './Section1.scss'

import { Logo } from './Logo'
import { PlaceDate } from './PlaceDate'


const Section1 = ({}) => {
  return(
    <div className="section1 flex">

      <Logo />

      <PlaceDate />

    </div>
  )
}

export default Section1