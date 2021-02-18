import React from 'react'
import './Menu.scss'
import { MenuPannel } from './MenuPannel'


export const Menu = ({auth, user, fn})=>{
	return(
    <div className="menu flex" >
      
      <img className="ava imgBtn" alt="user"
					src={
            user.ava
            ? `https://files.bzdrive.com/img/users/${user.login}.png`
            : `https://files.bzdrive.com/img/users/man.png`
          }
      />
      <img className="imgBtn" alt="menu"
					src={
            auth.active
            ? `https://files.bzdrive.com/img/Drive/ico/mainMenuOn.png`
            : `https://files.bzdrive.com/img/Drive/ico/mainMenuOff.png`
          }
					onClick={ ()=>fn({ app:"drive", type:"TOGGLE_MENU", payload:auth.active }) }
      />

      { auth.active && <MenuPannel auth={auth} user={user} fn={fn} /> }
      

    </div>
	)
}
