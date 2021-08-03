import React from 'react'


export const Copyright = ({info})=>{

  let arr = info && [
    {data:info.author, txt:"author"},
    {data:info.link, txt:"link"},
    {data:[`2018-${ new Date().getFullYear() }`], txt:"year"}
  ]

  return (
    <div className="right flex end">
      {
        info
        ? <>{ arr.map( (el,nr)=> <Line arr={el} nr={nr} key={`FooterSpan${el.txt}${nr}`} /> ) }</>
        : [1,2].map( (i)=> <div className="noData noDataTxt" key={`copy${i}`} ></div> )
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