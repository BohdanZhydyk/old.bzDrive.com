import React from 'react'
import './NewsTop.scss'
import { Ava } from './Ava'


export const NewsTop = ({top})=>{
  return (
    <div className="newsTop flex start">
      {/* <div>{`id: ${top.id}`}</div> */}
      {/* <span>{`lng: ${top.lng}`}</span> */}

      <Ava data={top.author} />

      <div className="newsInfo">
        <div className="txtGrn">{top.author.user}</div>
        <div className="dateTime">{top.dateTime}</div>
      </div>

      <div className="theme txtYlw flex start">{top.theme}</div>

    </div>
  )
}