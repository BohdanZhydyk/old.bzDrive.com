import React from 'react'
import { AuthPannel } from './auth/AuthPannel'


export const MenuPannel = ({auth, user, fn})=>{
	switch(user.role){
		case "guest":
			return(
				<div className="menuPannel">
					<AuthPannel auth={auth} fn={fn} />
					<div className="menuBtn">menuBtnGuest</div>
					<div className="menuBtn">menuBtnGuest</div>
				</div>
			)
		
		case "admin":
			return(
				<div className="menuPannel">
					<div className="menuBtn">menuBtnAdmin</div>
					<div className="menuBtn">menuBtnAdmin</div>
					<div className="menuBtn">menuBtnAdmin</div>
					<div className="menuBtn">menuBtnAdmin</div>
					<div className="menuBtn">menuBtnAdmin</div>
					<div className="menuBtn menuBtnExit" onClick={ ()=>fn({ app:"drive", type:"EXIT_MENU" }) }>logout</div>
				</div>
			)

			case "user":
				return(
					<div className="menuPannel">
						<div className="menuBtn">menuBtnUser</div>
						<div className="menuBtn">menuBtnUser</div>
						<div className="menuBtn">menuBtnUser</div>
						<div className="menuBtn menuBtnExit" onClick={ ()=>fn({ app:"drive", type:"EXIT_MENU" }) }>logout</div>
					</div>
				)
		
		default: return(<></>)
	}
}
