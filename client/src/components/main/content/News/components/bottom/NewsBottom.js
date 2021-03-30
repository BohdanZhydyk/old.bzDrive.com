import React from 'react'
import './NewsBottom.scss'


export const NewsBottom = ({data, user, fn})=>{

  let DELETE_NEWS = ()=> fn({ app: "news", type: "DELETE_NEWS", payload:data._id })
  
  return (
    <div className="newsBottom flex end">

      {
        user.role === "admin" &&
        <img
          className="imgBtn"
          onClick={ ()=> DELETE_NEWS() }
          src="https://files.bzdrive.com/img/ico/icoDelete.png"
          alt="delete"
        />
      }

      <span>{data.bottom.unix}</span>

    </div>
  )
}