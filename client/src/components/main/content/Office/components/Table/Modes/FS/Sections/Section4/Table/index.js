import React from 'react'

import { Article } from './Article'


const Table = ({ props:{pri, articles, id, officeFn} }) => {
  
  return(
    <div className={`articleTable${pri} flex wrap`}>

      <Article props={{pri, id, officeFn}} key={`ArticleLineTop`} />

      { articles.map( (el, index)=> <Article props={{pri, id, el, index, officeFn}} key={`ArticleLine${index}`} /> ) }

    </div>
  )
}

export default Table