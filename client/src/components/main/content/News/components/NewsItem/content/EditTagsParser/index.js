import React from 'react'
import './EditTagsParser.scss'

import NewTagsBtns from './NewTagsBtns'
import { EditTagH4 } from './EditTagH4'
import { EditTagP } from './EditTagP'


const EditTagsParser = ({ props:{item, admin, newsFn} })=>{
  return(
    <div className="flex column">
      <NewTagsBtns inn={"start"} newsFn={newsFn} />
      {
        item.content.map( (element, index)=>{
          switch(element.tag){
            case "h4":
              return <EditTagH4 props={{element, newsFn}} key={`EditTagH4${index}`} />
            case "p":
              return <EditTagP props={{element, newsFn}} key={`EditTagP${index}`} />
            default:
              return <></>
          }
        })
      }
    </div>
  )
}

export default EditTagsParser