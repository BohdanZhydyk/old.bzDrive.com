import React from 'react'
import './Container.scss'

import { InfoLine } from './InfoLine'
import { Technologie } from './Technologie'
import { Language } from './Language'
import { Paragraph } from './Paragraph'
import { Project } from './Project'


export const Container = ({data})=>{
  return (
    <div className="container flex wrap" >

      <div className="name" >{data.name}</div>

      {
        data.tags.map( (tag, index)=>{
          switch(tag.key){
            case "infoLine":    return <InfoLine data={tag.value} key={`InfoLine${index}`} />
            case "technologie": return <Technologie data={tag.value} key={`Technologie${index}`} />
            case "language":    return <Language data={tag} key={`Language${index}`} />
            case "paragraph":   return <Paragraph data={tag.value} key={`Paragraph${index}`} />
            case "project":     return <Project data={tag} key={`Project${index}`} />
            default: return <></>
          }
        })
      }
      
    </div>
  )
}