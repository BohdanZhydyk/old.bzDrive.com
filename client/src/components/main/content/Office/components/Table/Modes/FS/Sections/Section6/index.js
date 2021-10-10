import React from 'react'
import './Section6.scss'

import { Signature } from './Signature'


const Section6 = ({ props:{pri} }) => {

  const signatures = [
    "Osoba upoważniona do wystawienia",
    "Osoba upoważniona do odbioru"
  ]

  return(
    <div className="section6 flex wrap">

      {
        pri &&
        signatures.map( (sig, index)=> <Signature sig={sig} index={index} key={`Signature${index}`} /> )
      }
      
    </div>
  )
}

export default Section6