import React from 'react'
import './TagsParser.scss'

import { TagH4 } from './TagH4'
import { TagP } from './TagP'


const TagsParser = ({item})=>{
  return(
    <div className="flex column">
    {
      item.content.map( (element, index)=>{
        switch(element.tag){
          case "h4":
            return <TagH4 element={element} key={`tagH4${index}`} />
          case "p":
            return <TagP element={element} key={`tagP${index}`} />
          default:
            return <></>
        }
      })
    }
    </div>
  )
}

export default TagsParser