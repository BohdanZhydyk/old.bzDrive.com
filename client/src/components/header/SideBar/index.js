import React from 'react'
import './SideBar.scss'

import { MenuPannel } from './../Auth/MenuPannel'
import { Navigation } from './../Navigation'


const SideBar = ({ props:{active, auth, nav, lang, user, headerFn, TOGGLE_MENU} })=>{
	return(
		<div className="sideBar flex column start">
			{ active === "auth" && <MenuPannel props={{active, auth, lang, user, headerFn, TOGGLE_MENU}} /> }
			{ active === "nav" && <Navigation props={{nav, user, headerFn}} /> }
		</div>
	)
}

export default SideBar