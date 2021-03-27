import React from 'react'
import './Auth.scss'
import { MenuPannel } from './MenuPannel'


const Auth = ({auth, user, fn})=>{
	return(
    <>
    {
      auth
      ?
      <div className="auth flex" >
        
        <img className="ava imgBtn" alt="user"
            src={
              user.ava
              ? `https://files.bzdrive.com/img/users/${user.login}.png`
              : `https://files.bzdrive.com/img/users/man.png`
            }
            onClick={ ()=>fn({ app:"drive", type:"TOGGLE_MENU", payload:auth.active }) }
        />

        { auth.active && <MenuPannel auth={auth} user={user} fn={fn} /> }
        

      </div>
      :
      <div className="noData noDataImg"></div>
    }
    </>
	)
}

export default Auth