import React from 'react'
import './Section3.scss'

import { Info } from './Info'


const Section3 = ({dealer, buyer}) => {
  return(
    <div className="section3 flex">
      <Info info={dealer} name="Sprzedawca" />
      <Info info={buyer} name="Nabywca" />
    </div>
  )
}

export default Section3