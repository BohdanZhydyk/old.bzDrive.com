import React from 'react'
import './NewsBottom.scss'

import { EditPannel } from './EditPannel'


export const NewsBottom = ({data, user, fn})=>{
  return (
    <div className="newsBottom flex end">

      {
        user.role === "admin" &&
        <EditPannel data={data} fn={fn}/>
      }
  
      <span>{data.bottom.unix}</span>
    </div>
  )
}