import React from 'react'
import './index.scss'

import { News } from './components/News'


function NewsApp({state, user, fn}){

  if( !state ){ fn({ app:"news", type:"GET_STATE" }) }

  return (
    <div className="news">
      {
        state &&
        state.map( (item, index)=> 
          <News data={item} user={user} fn={fn} key={`news${item.bottom.unix+index}`} />
        )
      }
    </div>
  )
}

export default NewsApp