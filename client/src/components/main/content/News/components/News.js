import React from 'react'

import { NewsTop } from './top/NewsTop'
import { NewsContent } from './content/NewsContent'
import { NewsBottom } from './bottom/NewsBottom'


export const News = ({data, act})=>{
  return (
    <div className="container">
      <NewsTop data={data} act={act} />
      <NewsContent content={data.content} />
      <NewsBottom data={data} act={act} />
    </div>
  )
}