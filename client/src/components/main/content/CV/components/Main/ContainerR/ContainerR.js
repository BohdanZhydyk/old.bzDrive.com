import * as React from 'react'
import './ContainerR.scss'

import { InfoParagraph } from './InfoParagraph'
import { InfoImg } from './InfoImg'
import { InfoA } from './InfoA'


export const ContainerR = ({ data: {name, tags} })=>{
  return (
    <div className="containerR flex wrap" >
      <div className="name" >{name}</div>
      {
        tags.map( (tag, index)=>{
          switch(tag.key){
            case "paragraph":
              return <InfoParagraph tag={tag} key={tag.key + index} />

            case "img":
              return <InfoImg tag={tag} key={tag.key + index} />

            case "link":
              return <InfoA tag={tag} key={tag.key + index} />

            default:
              return ( <></> )
          }
        })
      }
    </div>
  )
}