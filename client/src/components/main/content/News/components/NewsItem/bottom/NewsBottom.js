import React from 'react'
import './NewsBottom.scss'

import LikesPannel from './LikesPannel'
import BtnPannel from './BtnPannel'


export const NewsBottom = ({ props:{item, admin, user, newsFn} })=>{  
  return (
    <div className="newsBottom flex">

      <LikesPannel props={{item, user, newsFn}} />

      <BtnPannel props={{item, admin, newsFn}} />

    </div>
  )
}