import React from 'react'

import { NewsTop } from './top/NewsTop'

import TagsParser from './content/TagsParser'
import EditTagsParser from './content/EditTagsParser'

import { NewsBottom } from './bottom/NewsBottom'


const NewsItem = ({ props:{item, admin, newsFn} })=>{

  return (
    <div className="container flex column">
      <NewsTop props={{item, admin, newsFn}} />
      <div className="newsContent">
      {
        !item.edit
        ? <TagsParser item={item} />
        : <EditTagsParser props={{item, admin, newsFn}} />
      }
      </div>
      <NewsBottom props={{item, admin, newsFn}} />
    </div>
  )
}

export default NewsItem