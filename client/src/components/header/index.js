import React from 'react'
import './Header.scss'

import { LogoPannel } from './LogoPannel'
import { Navigation } from './Navigation'
import Auth from './Auth'
import { Burger } from './Burger' 
import SideBar from './SideBar'


const Header = ({state, fn})=>{

	let active = state?.drive?.auth?.active ? state?.drive?.auth?.active : false

	let logo = state?.drive?.info ? state?.drive?.info : false
	let nav = state?.drive?.nav ? state?.drive?.nav : false
	let auth = state?.drive?.auth ? state?.drive?.auth : false
	let burger = true
	let user = state?.user
	let lang = user?.lang

	switch(user?.role){
		case "master":
			nav = nav.filter( (item)=> item.role !== "admin" )
			break
		case "user":
			nav = nav.filter( (item)=> item.role !== "master" && item.role !== "admin" )
			break
		case "guest":
			nav = nav.filter( (item)=> item.role !== "user" && item.role !== "master" && item.role !== "admin" )
			break
		default: break
	}

	let TOGGLE_MENU = (active)=> fn({ app:"drive", type:"TOGGLE_MENU", payload:active })

	return(
		<header className="flex between" >

			<LogoPannel props={{logo}} />

			<div className="flex" >

				<Navigation props={{nav,user,fn}} />

				<Auth props={{auth,user,active,TOGGLE_MENU}} />

				<Burger props={{burger,active,TOGGLE_MENU}} />

			</div>

			{ active && <SideBar props={{active, auth, nav, lang, user, fn, TOGGLE_MENU}} /> }

		</header>
	)
}

export default Header