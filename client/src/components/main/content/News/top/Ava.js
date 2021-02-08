import React from 'react'


export const Ava = ({data})=>{
  return (
    <div className="ava">

      <img  className="imgAva" alt="ava"
            src={`https://files.bzdrive.com/img/users/${data.user}.png`}
      />

      {
        data.online &&

        <img  className="imgOnline" alt="online"
              src="https://files.bzdrive.com/img/users/ava/online.png"
        />

      }

    </div>
  )
}