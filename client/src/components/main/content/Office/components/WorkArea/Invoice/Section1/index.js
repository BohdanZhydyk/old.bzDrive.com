import React from 'react'
import './Section1.scss'

import { Logo } from './Logo'
import { PlaceDate } from './PlaceDate'


const Section1 = ({dealer}) => {
  return(
    <div className="section1 flex">

      <Logo dealer={dealer} />

      <PlaceDate dealer={dealer} />

    </div>
  )
}

export default Section1