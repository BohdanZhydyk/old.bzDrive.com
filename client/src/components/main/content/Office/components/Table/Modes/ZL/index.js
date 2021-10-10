import React from 'react'
import './ZL.scss'

import Section1 from './Sections/Section1'


const ZL = ({ props:{mode, line, id, officeFn} })=>{
  
  let place = line.place
  let date = line.date
  let dealer = line.dealer
console.log(dealer)
  let pri = ( line.pri ? `-Print` : `` )

  return(
    <div className={`ZL${pri} flex start column`}>

      <Section1 props={{pri, place, date, dealer, id, officeFn}} />

    </div>
  )
}

export default ZL