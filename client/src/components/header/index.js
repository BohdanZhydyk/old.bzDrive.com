import React, { useState, useEffect } from 'react'
import './Header.scss'

import { actions } from './actions'

import { LogoPannel } from './LogoPannel'
import { Navigation } from './Navigation'
import Auth from './Auth'
import { Burger } from './Burger' 
import SideBar from './SideBar'


const Header = ({state, fn})=>{

	const [header, setHeader] = useState(false)

	const headerFn = (action)=> actions(action, header, setHeader)

	useEffect( ()=>{ !header && headerFn({ type:"GET_STATE" }) },[])

  console.log('header', header)

	let active = header?.auth?.active ? header?.auth?.active : false

	let logo = header?.info ? header?.info : false
	let nav = header?.nav ? header?.nav : false
	let auth = header?.auth ? header?.auth : false
	let burger = header ? true : false
	let user = header?.user
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

	let TOGGLE_MENU = (active)=> headerFn({type:"TOGGLE_MENU", payload:active })

	return(
		<header className="flex between" >

			<div className={`blur ${!active && `none`}`} onClick={ ()=> TOGGLE_MENU({active:false}) }>111</div>

			<LogoPannel props={{logo}} />

			<div className="flex" >

				<Navigation props={{nav, user, headerFn}} />

				<Auth props={{auth, user, active, TOGGLE_MENU}} />

				<Burger props={{burger, active, TOGGLE_MENU}} />

			</div>

			{ active && <SideBar props={{active, auth, nav, lang, user, headerFn, TOGGLE_MENU}} /> }

		</header>
	)
}

export default Header