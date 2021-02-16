import React from 'react'


export const Copyright = ({data})=>{
  return (
    <div className="right flex end">
      {
        data
        ?
        <>
          <span className="footerSpan">{data.copy}</span>
          <span className="footerSpan">
            <span className="txtOrg">{data.author[0]}</span>
            <span className="txtWht">{data.author[1]}</span>
            <span> </span>
            <span className="txtOrg">{data.author[2]}</span>
            <span className="txtWht">{data.author[3]}</span>
          </span>
          <span className="footerSpan">
            <span className="txtWht">{data.project.link[0]}</span>
            <span className="txtOrg">{data.project.link[1]}</span>
            <span className="txtWht">{data.project.link[2]}</span>
            <span className="txtOrg">{data.project.link[3]}</span>
          </span>
          <span className="footerSpan">
            {`2018-${ new Date().getFullYear() }`}
          </span>
        </>
        :
        [1,2].map( (item, index)=> <div className="noData noDataTxt" key={`copy${index}`} ></div> )
      }
    </div>
  )
}