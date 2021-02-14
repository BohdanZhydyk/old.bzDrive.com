import React from 'react'
import './NewsContent.scss'

import { TagP } from './TagP'
import { TagH4 } from './TagH4'
import { TagImg } from './TagImg'


export const NewsContent = ({content, mode})=>{
  return (
    <div className="newsContent">
      {
        content.map( (item, index)=>{
          switch(item.tag){
            case "p":
              return <TagP data={item.data} mode={mode} key={`tag${index}`} />
            case "h4":
              return <TagH4 data={item.data} mode={mode} key={`tag${index}`} />
            case "img":
              return <TagImg data={item.data} mode={mode} key={`tag${index}`} />
            default:
              return <></>
          }
        })
      }
    </div>
  )
}