import React from 'react'
import './FS.scss'

import Section1 from './Sections/Section1'
import Section2 from './Sections/Section2'
import Section3 from './Sections/Section3'
import Section4 from './Sections/Section4'
import Section5 from './Sections/Section5'
import Section6 from './Sections/Section6'


const FS = ({ props:{mode, line, id, officeFn} })=>{
  
  let place = line.place
  let date = line.date
  let dealer = line.dealer
  let buyer = line.buyer
  let invoiceNr = line.invoiceNr
  let articles = line.articles
  let comments = line.comments

  let pri = ( line.pri ? `-Print` : `` )

  return(
    <div className={`FS${pri} flex start column`}>

      <Section1 props={{pri, dealer, place, date, id, officeFn}} />

      <Section2 props={{pri, invoiceNr}} />

      <Section3 props={{pri, dealer, buyer, id, officeFn}} />

      <Section4 props={{pri, articles, comments, id, officeFn}} />

      <Section5 props={{pri, line, articles, officeFn}} />

      <Section6 props={{pri}} />

    </div>
  )
}

export default FS