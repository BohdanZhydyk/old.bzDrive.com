import React from 'react'
import './index.scss'

import { News } from './components/News'
import Loader from './../Loader'


const NewsApp = ({content, user, fn})=>{

  if( !content ){ fn({ app:"news", type:"GET_STATE" }) }

  return (
    <div className="news">
      {
        content
        ?
        content.map( (item, index)=> 
          <News data={item} user={user} fn={fn} key={`news${item.bottom.unix+index}`} />
        )
        :
        <Loader />
      }
    </div>
  )
}

export default NewsApp