import React from 'react'
import './SideBar.scss'

import { MenuPannel } from './../Auth/MenuPannel'
import { NavTop } from './../NavTop'


const SideBar = ({ props:{active, auth, nav, lang, user, fn, TOGGLE_MENU} })=>{
	return(
		<div className="sideBar flex column start">
			{ active === "auth" && <MenuPannel props={{active, auth, lang, user, fn, TOGGLE_MENU}} /> }
			{ active === "nav" && <NavTop nav={nav} lang={lang} fn={fn} /> }
		</div>
	)
}

export default SideBar