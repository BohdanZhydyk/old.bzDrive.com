import React from 'react'

import { AddNews } from './AddNews'
import NewsItem from './NewsItem'


export const News = ({ props:{news, user, newsFn} })=>{

  let admin = user.role === "admin" ? true : false

  return(
    <>

    { admin && <AddNews newsFn={newsFn} /> }

    {
      news.map( (item, index)=>
        <NewsItem props={{item, admin, user, newsFn}} key={`news${item.bottom.unix+index}`} />
      )
    }
    
    </>
  )
}