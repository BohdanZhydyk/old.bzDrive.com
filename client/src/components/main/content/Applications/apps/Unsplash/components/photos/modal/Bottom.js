import React from 'react'

import geoIcon from './../../../imgs/geo-icon.png'
import shareIcon from './../../../imgs/share-icon.png'
import infoIcon from './../../../imgs/info-icon.png'

import { Button } from './Button'


const btns = [
  {img:shareIcon, txt:'share', act:{type:false, payload:false} },
  {img:infoIcon, txt:'info', act:{type:false, payload:false} }
]

export const Bottom = ({data, actions})=>{
  return(
    <div className="areaBottom flex stretch">

      <div className="areaBottomL flex start">
        <img src={geoIcon} alt="geo" />
        <span>{data.location}</span>
      </div>

      <div className="areaBottomR flex end">
        {
          btns.map( (btn, index)=>
            <Button img={btn.img} txt={btn.txt} alt={btn.alt} act={btn.act} actions={actions} />
          )
        }
      </div>

    </div>
  )
}