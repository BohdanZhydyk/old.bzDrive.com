import React from 'react'

import { Article } from './Article'


const Table = ({ props:{articles, nr, officeFn} }) => {

  return(
    <div className="table flex wrap">

      <Article props={{officeFn}} key={`ArticleLineTop`} />

      { articles.map( (el, index)=> <Article props={{el, index, officeFn}} key={`ArticleLine${index}`} /> ) }

    </div>
  )
}

export default Table