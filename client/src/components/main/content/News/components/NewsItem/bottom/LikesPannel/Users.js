import React from 'react'


export const Users = ({ props:{visible, likes} })=>{
  return(
    <div className="users">
    {
      visible &&
      likes.map( (user)=>
        <span className="user">
          <span className="txtWht">[</span>
          <span className="txtOrg">{` ${user} `}</span>
          <span className="txtWht">]</span>
        </span>
      )
    }
    </div>
  )
}