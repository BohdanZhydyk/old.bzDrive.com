import React from 'react'


export const Like = ({ props:{likes, include, VISIBLE, LIKE_CLICK} })=>{

  let src = `https://files.bzdrive.com/img/ico/like${ include ? `On` : `Off` }.png`

  return(
    <div className="like flex start">

      <div className="likeLen flex" onClick={ ()=> VISIBLE() } >
        {`${likes.length}`}
      </div>

      <img className="likeBtn" src={src} onClick={ ()=> LIKE_CLICK() } alt="like" />

    </div>
  )
}