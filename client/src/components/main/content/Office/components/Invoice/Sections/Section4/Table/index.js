import React from 'react'

import { Article } from './Article'


const Table = ({ props:{printMode, articles, nr, officeFn} }) => {

  return(
    <div className={`articleTable${printMode} flex wrap`}>

      <Article props={{printMode, officeFn}} key={`ArticleLineTop`} />

      { articles.map( (el, index)=> <Article props={{printMode, el, index, officeFn}} key={`ArticleLine${index}`} /> ) }

    </div>
  )
}

export default Table