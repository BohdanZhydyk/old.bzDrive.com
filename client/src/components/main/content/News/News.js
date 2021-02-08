import React, { useState } from 'react'
import './News.scss'

import news from './news.json'
import { NewsTop } from './top/NewsTop'
import { NewsContent } from './content/NewsContent'
import { NewsBottom } from './bottom/NewsBottom'


export const News = ()=>{

  const [state, setState] = useState(news)

  function act(action){
    switch(action.type){

      case "EDIT_ON":
        setState({...state, editMode:action.payload})
        break

      default:
        break
    }
  }

  return (
    <div className="news">
      {
        state.news.map( (item, index)=>{
          return(
            <div className="newsItem" key={`newsNr${index}`}>
              <NewsTop top={item.top} />
              <NewsContent content={item.content} mode={state.editMode} />
              <NewsBottom bottom={item.bottom} act={act} />
            </div>
          )
        })
      }

      {/* <NewsTop top={data.top} />

      <NewsContent content={data.content} mode={state.editMode} />

      <NewsBottom bottom={data.bottom} act={act} /> */}

    </div>
  )
}