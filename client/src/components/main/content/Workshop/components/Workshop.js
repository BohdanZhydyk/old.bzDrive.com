import React from 'react'

import { TagH } from './TagH'
import { TagP } from './TagP'
import { TagUl } from './TagUl'
import { TagVideo } from './TagVideo'
import { TagSlider } from './TagSlider'
import { TagMap } from './TagMap'
import { TagContacts } from './TagContacts'


export const Workshop = ({ props:{workshop, user, workshopFn} })=>{

  let key = (element, index) => { return(`WorkshopTag${element.tag+index}`) }

  return(
    <div className="flex column">
    {
      workshop.map( (element, index)=>{
        switch(element.tag){
          case "h": return <TagH props={{body:element.body, user}} key={key(element, index)} />
          case "p": return <TagP props={{body:element.body, user}} key={key(element, index)} />
          case "ul": return <TagUl props={{body:element.body, user}} key={key(element, index)} />
          case "slider": return <TagSlider props={{body:element.body, user}} key={key(element, index)} />
          case "contacts": return <TagContacts props={{body:element.body, user}} key={key(element, index)} />
          // case "video": return <TagVideo props={{body:element.body, user}} key={key(element, index)} />
          // case "map": return <TagMap props={{body:element.body, user}} key={key(element, index)} />
          default: return <></>
        }
      })
    }
    </div>
  )
}
