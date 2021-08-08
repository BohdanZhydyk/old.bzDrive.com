import React from 'react'

import { ScreenSaver } from '../ScreenSaver'


export const Copyright = ({ props:{cop} })=>{

  let arr = cop && [
    {data:cop.author, txt:"author"},
    {data:cop.link, txt:"link"},
    {data:[`2018-${ new Date().getFullYear() }`], txt:"year"}
  ]

  return (
    <div className="right flex end">
    {
      cop
      ?
      <>
      {
        arr.map( (el,nr)=> <Line arr={el} nr={nr} key={`FooterSpan${el.txt}${nr}`} /> )
      }
      </>
      : <ScreenSaver arr={["Txt","Txt"]} />
    }
    </div>
  )
}

const Line = ({arr, nr})=>{

  let color = false
  let cl = ()=>{
    color = !color
    return color ? `txtWht` : `txtOrg`
  }

  return(
    <span className="footerSpan" >
    { arr.data.map( (item, index)=> <span className={cl()} key={arr.txt+nr+index}>{item}</span> ) }
    </span>
  )
}