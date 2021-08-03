import React from 'react'
import './Auth.scss'


const Auth = ({ props:{auth, lang, user, active, TOGGLE_MENU, fn} })=>{

  let ImgClick = ()=> TOGGLE_MENU({active: active ? false : `auth`})

  let usr = user.ava ? user.login : `man`
  let src = `https://files.bzdrive.com/img/users/${usr}.png`

	return(
    <>
    {
      auth
      ?
      <div className="auth flex" >
        
        <img className="ava imgBtn" src={src} onClick={ ()=> ImgClick() } alt="user" />

      </div>
      :
      <div className="noData noDataImg"></div>
    }
    </>
	)
}

export default Auth