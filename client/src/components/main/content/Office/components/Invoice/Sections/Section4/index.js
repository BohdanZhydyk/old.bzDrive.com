import React from 'react'
import './Section4.scss'

import Table from './Table'
import { Summary } from './Summary'


const Section4 = ({ props:{printMode, articles, comments, nr, officeFn} }) => {
  return(
    <div className="section4 flex column">

      <Table props={{printMode, articles, nr, officeFn}} />

      <Summary props={{printMode, articles, comments, officeFn}} />

    </div>
  )
}

export default Section4