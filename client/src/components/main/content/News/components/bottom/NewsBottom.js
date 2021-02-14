import React from 'react'
import './NewsBottom.scss'

import { EditPannel } from './EditPannel'


export const NewsBottom = ({data, act})=>{

  const user = JSON.parse( localStorage.getItem('user') )

  return (
    <div className="newsBottom flex end">

      {
        user.role === "admin" &&
        <EditPannel data={data} act={act}/>
      }
  
      <span>{data.bottom.unix}</span>
    </div>
  )
}