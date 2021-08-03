import React from 'react'
import './Header.scss'

import { LogoPannel } from './LogoPannel'
import { NavTop } from './NavTop'
import Auth from './Auth'
import { NavBurger } from './NavBurger' 
import SideBar from './SideBar'


const Header = ({state, fn})=>{

	let active = state.drive.auth.active ? state.drive.auth.active : false

	let TOGGLE_MENU = (active)=> fn({ app:"drive", type:"TOGGLE_MENU", payload:active })

	let info = state.drive.info
	let auth = state.drive.auth
	let user = state.user
	let lang = user.lang
	let nav = state.drive.nav.map( (item, index)=>{
		return {name:item.name, to:item.to, role:item.role, active:item.active}
	})

	switch(user.role){
		case "master":
			nav = nav.filter( (item)=> item.role !== "admin" )
			break
		case "user":
			nav = nav.filter( (item)=> item.role !== "admin" && item.role !== "master" )
			break
		case "guest":
			nav = nav.filter( (item)=> item.role !== "user" && item.role !== "master" && item.role !== "admin" )
			break
		default: break
	}

	return(
		<header className="flex" >

			<LogoPannel info={info} />

			<NavTop cl="end" nav={nav} lang={lang} fn={fn} />

			<Auth props={{auth, lang, user, active, TOGGLE_MENU, fn}} />

			<NavBurger props={{active, TOGGLE_MENU}} />

			{ active && <SideBar props={{active, auth, nav, lang, user, fn, TOGGLE_MENU}} /> }

		</header>
	)
}

export default Header