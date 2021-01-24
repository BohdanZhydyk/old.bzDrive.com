import React from 'react'


export const Copyright = ({data})=>{
  return (
    <div className="right flex end">
      <span className="footerSpan">{data.copy}</span>
      <span className="footerSpan">
        <span className="txtOrg">{data.author[0]}</span>
        <span className="txtWht">{data.author[1]}</span>
        <span> </span>
        <span className="txtOrg">{data.author[2]}</span>
        <span className="txtWht">{data.author[3]}</span>
      </span>
      <span className="footerSpan">
        <span className="txtWht">{data.link[0]}</span>
        <span className="txtOrg">{data.link[1]}</span>
        <span className="txtWht">{data.link[2]}</span>
        <span className="txtOrg">{data.link[3]}</span>
      </span>
      <span className="footerSpan">
        {`2018-${ new Date().getFullYear() }`}
      </span>
    </div>
  )
}