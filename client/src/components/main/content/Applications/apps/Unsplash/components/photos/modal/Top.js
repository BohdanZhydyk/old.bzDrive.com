import React from 'react'

import likeIcon from './../../../imgs/like-icon.png'
import plusIcon from './../../../imgs/plus-icon.png'
import closeIcon from './../../../imgs/delete-icon.png'

import { Button } from './Button'


const btns = [
  {img:likeIcon, txt:'like', act:{type:false, payload:false} },
  {img:plusIcon, txt:'plus', act:{type:false, payload:false} },
  {img:closeIcon, txt:'close', act:{type:"CLOSE_WINDOW", payload:""}}
]

export const Top = ({data, actions})=>{
  return(
    <div className="areaTop flex stretch">

      <div className="areaTopL flex start">
        <img src={data.ava} alt="ava" />
        <div>
          <div className="authorName">{data.author}</div>
          {
            data.instagram !== null &&
            <div className="authorInstagram">{`@${data.instagram}`}</div>
          }
        </div>
      </div>

      <div className="areaTopR flex end">
        {
          btns.map( (btn, index)=>
            <Button img={btn.img} txt={btn.txt} act={btn.act} actions={actions} />
          )
        }
      </div>

    </div>
  )
}