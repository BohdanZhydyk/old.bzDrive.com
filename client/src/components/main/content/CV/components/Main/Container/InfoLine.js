import React from 'react'


export const InfoLine = ({data})=>{
  return (
    <div className="line flex wrap start" >
      <img src={`https://files.bzdrive.com/img/CV/ico/info/${data.name}.png`} alt="img"/>
      <span>{data.name}</span>
      <a className="txtRed" href={data.link} target="_blank" rel="noreferrer">{data.txt}</a>
    </div>
  )
}