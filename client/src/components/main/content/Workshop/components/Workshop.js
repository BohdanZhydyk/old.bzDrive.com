import React from 'react'

import { TagH } from './TagH'
import { TagP } from './TagP'
import { TagUl } from './TagUl'
import { TagVideo } from './TagVideo'
import { TagSlider } from './TagSlider'


export const Workshop = ({ props:{workshop, user, workshopFn} })=>{

  let admin = user.role === "admin" ? true : false

  return(
    <div className="flex column">
    {
      workshop.map( (element, index)=>{
        switch(element.tag){
          case "h": return <TagH body={element.body} user={user} key={`WorkshopTag${element.tag+index}`} />
          case "p": return <TagP body={element.body} user={user} key={`WorkshopTag${element.tag+index}`} />
          case "ul": return <TagUl body={element.body} user={user} key={`WorkshopTag${element.tag+index}`} />
          case "video": return <TagVideo body={element.body} user={user} key={`WorkshopTag${element.tag+index}`} />
          case "slider": return <TagSlider body={element.body} user={user} key={`WorkshopTag${element.tag+index}`} />
          default: return <></>
        }
      })
    }
    </div>
  )
}