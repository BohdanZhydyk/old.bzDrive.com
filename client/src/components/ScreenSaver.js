import React from 'react'


export const ScreenSaver = ({arr})=>{
  return(
    <>
    { arr.map( (el,nr)=> <span className={`noData noData${el}`} key={Math.random(1000000000)}></span> ) }
    </>
  )
}