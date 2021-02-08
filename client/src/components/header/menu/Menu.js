import React from 'react'
import './Menu.scss'
import { MenuPannel } from './MenuPannel'


export const Menu = ({auth, user, fn})=>{
	return(
    <div className="menu flex" >
      
      <img className="ava imgBtn" alt="user"
					src={user.login && `https://files.bzdrive.com/img/users/${user.login}.png`}
					onClick={ ()=>fn({ type:"TOGGLE_MENU", payload:auth.active }) }
      />

      { auth.active && <MenuPannel auth={auth} user={user} fn={fn} /> }
      

    </div>
	)
}