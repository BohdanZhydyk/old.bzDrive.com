import React from 'react'
import './Section4.scss'

import Table from './Table'
import { Comments } from './Comments'


const Section4 = ({ props:{printMode, articles, comments, nr, officeFn} }) => {
  return(
    <div className="section4 flex column">

      <Table props={{printMode, articles, nr, officeFn}} />

      <Comments comments={comments} />

    </div>
  )
}

export default Section4