import React from 'react'


export const Cell = ({ props:{cl, data, nr} })=>{

  let classes = `cell flex ${cl}`

  return( <div className={classes}>{data}</div> )
}