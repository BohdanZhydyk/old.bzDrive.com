import React from 'react'
import './Invoice.scss'

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

  return(
    <div className="Invoice flex column">

      <Section1 props={{dealer, place, date, nr, officeFn}} />

      <Section2 props={{dealer, buyer, nr, officeFn}} />

      <Section3 props={{invoiceNr}} />

      <Section4 props={{articles, comments, nr, officeFn}} />

      <Section5 props={{articles}} />

      <Section6 />

    </div>
  )
}

export default Invoice