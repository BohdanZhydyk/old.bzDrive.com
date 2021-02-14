import React from 'react'


export const Language = ({data})=>{
  return (
    <div className="line flex wrap start" >
      <img src={`https://files.bzdrive.com/img/CV/ico/lang/${data.txt}.png`} alt="img"/>
      <span>{data.txt}</span>
      <span className="txtRed">{data.value}</span>
    </div>
  )
}