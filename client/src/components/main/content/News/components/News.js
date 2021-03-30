import React from 'react'

import { NewsTop } from './top/NewsTop'
import { NewsContent } from './content/NewsContent'
import { NewsBottom } from './bottom/NewsBottom'


export const News = ({data, user, fn})=>{
  return (
    <div className="container">
      <NewsTop data={data} user={user} fn={fn} />
      <NewsContent content={data.content} user={user} fn={fn} />
      <NewsBottom data={data} user={user} fn={fn} />
    </div>
  )
}