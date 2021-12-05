import React from 'react'

import ByLinks from './ByLinks'
import ByUser from './ByUser'


export const Statistic = ({ props:{statistic, user, statisticFn} })=>{

  return(
    <div className="statistic flex column">

      <ByLinks statistic={statistic} />

      <ByUser statistic={statistic} />

    </div>
  )
}
