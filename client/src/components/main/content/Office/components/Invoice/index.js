import React from 'react'
import './Invoice.scss'

import { Buttons } from './Buttons'
import { CloseBtn } from './CloseBtn'
import Section1 from './Sections/Section1'
import Section2 from './Sections/Section2'
import Section3 from './Sections/Section3'
import Section4 from './Sections/Section4'
import Section5 from './Sections/Section5'
import Section6 from './Sections/Section6'


const Invoice = ({ props:{line, nr, officeFn} })=>{
  
  let place = line.place
  let date = line.date
  let dealer = line.dealer
  let buyer = line.buyer
  let invoiceNr = line.invoiceNr
  let articles = line.articles
  let comments = line.comments

  let printMode = ( nr === "print" ? `-Print` : `` )

  return(
    <div className={`Invoice${printMode} flex start column`}>

      {
        printMode
        ? <CloseBtn props={{invoiceNr, officeFn}} />
        : <Buttons props={{line, officeFn}} />
      } 

      <Section1 props={{printMode, dealer, place, date, nr, officeFn}} />

      <Section2 props={{printMode, invoiceNr}} />

      <Section3 props={{printMode, dealer, buyer, nr, officeFn}} />

      <Section4 props={{printMode, articles, comments, nr, officeFn}} />

      <Section5 props={{printMode, line, articles, officeFn}} />

      <Section6 props={{printMode}} />

      { !printMode && <Buttons props={{line, officeFn}} /> }  

    </div>
  )
}

export default Invoice