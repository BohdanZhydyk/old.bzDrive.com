import React, { useEffect } from 'react'
import './index.scss'

import { AddNews } from './components/AddNews'
import { News } from './components/News'
import Loader from './../Loader'


const NewsApp = ({content, user, fn})=>{

  useEffect( ()=>{ !content && fn({ app:"news", type:"GET_STATE" }) },[])

  return (
    <div className="news">
      {
        content
        ?
        <>
        {
          user.role === "admin" && <AddNews user={user} fn={fn} />
        }
        {
          content.map( (item, index)=>
            <News data={item} user={user} fn={fn} key={`news${item.bottom.unix+index}`} />
          )
        }
        </>
        
        :
        <Loader />
      }
    </div>
  )
}

export default NewsApp