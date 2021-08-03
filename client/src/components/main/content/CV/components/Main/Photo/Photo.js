import React from 'react'
import './Photo.scss'


export const Photo = ({ data:{img, text} })=>{
  return (
    <div className="photo flex wrap" >

      <div className="text flex" >{text}</div>

      <img className="img" src={img} alt="ava" />

    </div>
  )
}