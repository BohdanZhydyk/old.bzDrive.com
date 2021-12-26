import React from "react"


export const Cell = ({ props:{txt, cl, align, line, n} })=>{

  let classes = `${cl} ${n === 0 ? `top` : align} ${line.status} cell flex`

  return( <span className={classes}>{txt}</span> )
}