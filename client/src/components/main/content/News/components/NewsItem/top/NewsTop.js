import React from 'react'
import './NewsTop.scss'

import { Ava } from './Ava'
import { NewsInfo } from './NewsInfo'
import { Theme } from './Theme'


export const NewsTop = ({ props:{item, admin, newsFn} })=>{

  let author = item.top.author
  let dateTime = item.top.dateTime

  return(
    <div className="newsTop flex start">

      <Ava author={author} />

      <NewsInfo author={author} dateTime={dateTime} />

      <Theme props={{item, admin, newsFn}} />

    </div>
  )
}