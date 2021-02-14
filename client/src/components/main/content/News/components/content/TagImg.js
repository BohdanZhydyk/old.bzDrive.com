import React from 'react'


export const TagImg = ({data})=>{
  return (
    <div className="tagWraper flex">
      <img className="img" src={data} alt="newsImg" />
    </div>
  )
}