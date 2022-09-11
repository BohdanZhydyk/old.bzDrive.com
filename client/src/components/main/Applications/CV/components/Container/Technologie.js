import React from 'react'


export const Technologie = ({data})=>{
  return (
    <div className="line flex wrap start" >

      <img src={`https://bzdrive.com/files/CV/ico/tech/${data}.png`} alt="img"/>

      <span>{data}</span>
      
    </div>
  )
}