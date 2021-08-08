import React, { useState, useEffect } from 'react'
import './News.scss'

import { getUser } from './../../../../store/functions'

import { actions } from './actions'

import { News } from './components/News'
import Loader from './../Loader'


const NewsApp = ()=>{

  const [news, setNews] = useState(false)

  const newsFn = (action)=> actions(action, news, setNews)

  useEffect( ()=>{ !news && newsFn({ type:"GET_STATE" }) },[])

  let user = getUser()

  console.log('news', news)

  return (
    <div className="news">

      { !news ? <Loader /> : <News props={{news, user, newsFn}} /> }
      
    </div>
  )
}

export default NewsApp