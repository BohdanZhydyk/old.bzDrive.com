import React from 'react'
import './Auth.scss'

import { ScreenSaver } from '../../ScreenSaver'


const Auth = ({ props:{auth,user,active,TOGGLE_MENU} })=>{

  let ImgClick = ()=> TOGGLE_MENU({active: active ? (active === "nav" ? "auth" : false) : `auth`})

  let usr = user?.ava ? user.login : `man`
  let src = `https://files.bzdrive.com/img/users/${usr}.png`

	return(
    <div className="auth flex" >
    {
      auth
      ?
      <div className="flex" onClick={ ()=> ImgClick() } >
        
        <img className="ava imgBtn" src={src} alt="user" />

      </div>
      : <ScreenSaver arr={["Img"]} />
    }
    </div>
	)
}

export default Auth