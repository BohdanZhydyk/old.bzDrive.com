import React from 'react'
import './Auth.scss'
import { AuthPannel } from './AuthPannel'


export const Auth = ({auth, user, fn})=>{
	return(
    <div className="auth flex" >
      
      <img className="ava imgBtn" alt="user"
					src={user.login && `https://files.bzdrive.com/img/users/${user.login}.png`}
					onClick={ ()=>fn({ type:"TOGGLE_AUTH_PANNEL", payload:auth.active }) }
      />

      <AuthPannel auth={auth} fn={fn} />

    </div>
	)
}
