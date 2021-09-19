import React from 'react'

import { ScreenSaver } from '../ScreenSaver'


export const Copyright = ({ props:{author, link} })=>{

  let arr = [
    {data:author ? author : [], txt:"author"},
    {data:link ? link : [], txt:"link"},
    {data:[`2018-${ new Date().getFullYear() }`], txt:"year"}
  ]

  return (
    <div className="right flex end">
    {
      author
      ?
      <>
      {
        arr.map( (el,nr)=> <Line el={el} nr={nr} key={`FooterSpan${el.txt}${nr}`} /> )
      }
      </>
      : <ScreenSaver arr={["Txt","Txt"]} />
    }
    </div>
  )
}

const Line = ({el, nr})=>{

  let color = false
  let cl = ()=>{
    color = !color
    return color ? `txtWht` : `txtOrg`
  }

  return(
    <span className="footerSpan" >
    { el.data.map( (item, index)=> <span className={cl()} key={el.txt+nr+index}>{item}</span> ) }
    </span>
  )
}