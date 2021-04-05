import React from 'react'


export const Button = ({ txt, func })=>{

  let src = `https://files.bzdrive.com/img/ico/ico${txt}.png`

  return(
    <img className="imgBtn" src={src} onClick={ ()=> func() } alt={txt} />
  )
}