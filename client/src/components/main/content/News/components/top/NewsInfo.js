import React from 'react'


export const NewsInfo = ({data})=>{
  return (
    <div className="newsInfo">
      <div className="txtGrn">{data.author.user}</div>
      <div className="dateTime">{data.dateTime}</div>
    </div>
  )
}