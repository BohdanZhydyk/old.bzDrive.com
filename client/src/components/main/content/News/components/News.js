import React from 'react'

import { NewsTop } from './top/NewsTop'
import { NewsContent } from './content/NewsContent'
import { NewsBottom } from './bottom/NewsBottom'


export const News = ({data, user, fn})=>{
  return (
    <div className="container">
      <NewsTop data={data} fn={fn} />
      <NewsContent content={data.content} />
      <NewsBottom data={data} user={user} fn={fn} />
    </div>
  )
}