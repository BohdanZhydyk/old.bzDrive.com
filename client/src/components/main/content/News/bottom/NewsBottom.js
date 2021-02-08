import React from 'react'
import './NewsBottom.scss'


export const NewsBottom = ({bottom, act})=>{
  return (
    <div className="newsBottom flex end">
      <img className="ImgSmall" src="https://bzdrive.com/img/ico/icoEdit.png" alt="edit"
      onClick={ ()=>act({type:"EDIT_ON", payload:true}) } />
      <span>{bottom.unix}</span>
    </div>
  )
}