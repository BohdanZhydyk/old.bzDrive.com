import React from 'react'
import './Section4.scss'

import Table from './Table'
import { Summary } from './Summary'


const Section4 = ({ props:{pri, articles, comments, id, officeFn} }) => {
  return(
    <div className="section4 flex column">

      <Table props={{pri, articles, id, officeFn}} />

      <Summary props={{pri, articles, comments, officeFn}} />

    </div>
  )
}

export default Section4