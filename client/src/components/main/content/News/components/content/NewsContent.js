import React from 'react'
import './NewsContent.scss'

import { TagP } from './TagP'
import { TagH4 } from './TagH4'


export const NewsContent = ({content, user, fn})=>{
  return (
    <div className="newsContent">
      {
        content.map( (item, index)=>{
          switch(item.tag){
            case "p":
              return <TagP data={item.data} fn={fn} key={`tagp${index}`} />
            case "h4":
              return <TagH4 data={item.data} fn={fn} key={`tagh4${index}`} />
            default:
              return <></>
          }
        })
      }
    </div>
  )
}