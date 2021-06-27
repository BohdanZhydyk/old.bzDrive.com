import React from 'react'
import './Section2.scss'

import { unixToMonthYearConverter } from './../../../../../../../../store/functions'


const Section2 = ({}) => {
  return(
    <div className="section2 flex bold">
      <span className="inv flex">Faktura Nr</span>
      <span className="nr flex">{`------/${unixToMonthYearConverter()}`}</span>
    </div>
  )
}

export default Section2