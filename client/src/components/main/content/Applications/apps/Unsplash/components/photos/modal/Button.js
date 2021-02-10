import React from 'react'

import likeIcon from './../../../imgs/like-icon.png'
import plusIcon from './../../../imgs/plus-icon.png'
import closeIcon from './../../../imgs/delete-icon.png'


export const Button = ({img, txt, act, actions})=>{
  return(
    <div className="modalBtns flex" onClick={ ()=> actions(act) } >
      <img src={img} alt={txt} />
      <span>{txt}</span>
    </div>
  )
}