import React from 'react'
import './Section6.scss'

import { Signature } from './Signature'


const Section6 = ({}) => {

  const signatures = [
    "Osoba upoważniona do odbioru",
    "Osoba upoważniona do wystawienia"
  ]

  return(
    <div className="section6 flex">

      { signatures.map( (sig, index)=> <Signature sig={sig} index={index} /> ) }
      
    </div>
  )
}

export default Section6