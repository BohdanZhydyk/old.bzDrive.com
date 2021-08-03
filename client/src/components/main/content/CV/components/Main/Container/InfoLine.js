import React from 'react'


export const InfoLine = ({data})=>{

  let src = `https://files.bzdrive.com/img/CV/ico/info/${data.name}.png`

  return (
    <div className="line flex wrap start" >

      <img src={src} alt="img"/>

      <span>{data.name}</span>

      <a className="txtRed" href={data.link} target="_blank" rel="noreferrer">{data.txt}</a>

    </div>
  )
}