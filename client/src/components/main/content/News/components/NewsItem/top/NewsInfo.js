import React from 'react'


export const NewsInfo = ({author, dateTime})=>{
  return (
    <div className="newsInfo">
      <div className="txtGrn">{author}</div>
      <div className="dateTime">{dateTime}</div>
    </div>
  )
}