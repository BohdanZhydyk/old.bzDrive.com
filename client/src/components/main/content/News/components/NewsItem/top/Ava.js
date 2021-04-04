import React from 'react'


export const Ava = ({author})=>{
  return (
    <div className="ava">

      <img className="imgAva" src={`https://files.bzdrive.com/img/users/${author}.png`} alt="ava" />

      {/* {
        data.online &&
        <img className="imgOnline" src="https://files.bzdrive.com/img/users/online.png" alt="online" />
      } */}

    </div>
  )
}