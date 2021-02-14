import React from 'react'
import './NewsTop.scss'

import { Ava } from './Ava'
import { NewsInfo } from './NewsInfo'
import { Theme } from './Theme'


export const NewsTop = ({data, act})=>{
  return(
    <div className="newsTop flex start">

      <Ava data={data.top.author} />

      <NewsInfo data={data.top} />

      <Theme data={data} act={act}/>

    </div>
  )
}