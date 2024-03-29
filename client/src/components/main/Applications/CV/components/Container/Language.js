import React from 'react'


export const Language = ({data})=>{

  let src = `https://bzdrive.com/files/CV/ico/lang/${data.txt}.png`

  return (
    <div className="line flex wrap start" >

      <img src={src} alt="img"/>

      <span>{data.txt}</span>

      <span className="txtRed">{data.value}</span>

    </div>
  )
}