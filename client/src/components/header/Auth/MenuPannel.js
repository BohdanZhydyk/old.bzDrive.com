import React from 'react'

import { translate } from './../../../store/translate'
import AuthPannel from './AuthPannel'
import { LangBtn } from './LangBtn'


export const MenuPannel = ({ props:{active, auth, lang, user, fn, TOGGLE_MENU} })=>{

	let EXIT_MENU = ()=> fn({ app:"drive", type:"EXIT_MENU" })

	return(
		<div className="menuPannel">

			<LangBtn props={{lang, active, TOGGLE_MENU}} />

			{ 
				user.role === "guest"
				?
				<AuthPannel props={{auth, lang, fn}} />
				:
				<div className="menuBtn menuBtnExit flex" onClick={ ()=> EXIT_MENU() } >
					{translate(lang, "logoutBtn")}
				</div>
			}

		</div>
	)
}
