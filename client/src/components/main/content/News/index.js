import React, { useState, useEffect } from 'react'
import './index.scss'

import {
  GET_STATE,
  ADD_NEWS,
  EDIT_NEWS,
  SAVE_NEWS,
  DELETE_NEWS,
  CHANGE_INPUT,
  ADD_TAG,
  LIKE_CLICK
} from './actions'
import { News } from './components/News'
import Loader from './../Loader'


const NewsApp = ({content, user, fn})=>{

  const [news, setNews] = useState(content)

  let newsFn = (action)=>{
    switch(action.type){
      case "GET_STATE":     GET_STATE(fn);                        break;
      case "ADD_NEWS":      ADD_NEWS(user, fn);                   break;
      case "EDIT_NEWS":     EDIT_NEWS(action, news, setNews);     break;
      case "SAVE_NEWS":     SAVE_NEWS(action, news, fn);          break;
      case "DELETE_NEWS":   DELETE_NEWS(action, fn);              break;
      case "CHANGE_INPUT":  CHANGE_INPUT(action, news, setNews);  break;
      case "ADD_TAG":       ADD_TAG(action, news, setNews);       break;
      case "LIKE_CLICK":    LIKE_CLICK(action, news, fn);    break;
      default: break
    }
  }

  useEffect( ()=>{ !content && newsFn({ type:"GET_STATE" }) },[])

  console.log('news', news)

  return (
    <div className="news">
      {
        !content
        ? <Loader />
        : <News props={{news, user, newsFn}} />
      }
    </div>
  )
}

export default NewsApp